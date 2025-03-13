# Edgar
import pandas as pd
import sqlite3
import matplotlib.pyplot as plt
import socket

# Get the machine name and IP address 
machine_name = socket.gethostname()
ip_address = socket.gethostbyname(machine_name)

# Read income data from Excel and expense data from a text file.
income_df = pd.read_excel('income.xlsx')
expenses_df = pd.read_csv('expenses.txt', sep=' ')

# Convert the 'Month' column to datetime format and check for invalid dates.
income_df['Month'] = income_df['Month'].astype(str)
income_df['Month'] = pd.to_datetime(income_df['Month'].str.strip(), format='%Y-%m-%d', errors='coerce')
expenses_df['Month'] = pd.to_datetime(expenses_df['Month'].str.strip(), format='%Y-%m-%d', errors='coerce')


if income_df['Month'].isna().any():
    print("Warning: Invalid dates found in income data.")
if expenses_df['Month'].isna().any():
    print("Warning: Invalid dates found in expenses data.")


merged_df = pd.merge(income_df, expenses_df, on='Month', how='inner')


merged_df['Savings'] = merged_df['Income'] - merged_df['Expenses']


if merged_df['Income'].sum() <= 0:
    raise ValueError("Total income must be greater than zero.")
if merged_df['Expenses'].sum() > merged_df['Income'].sum():
    raise ValueError("Total expenses cannot exceed total income.")


expense_percentage = merged_df['Expenses'].sum() / merged_df['Income'].sum() * 100
labels = ['Expenses', 'Savings']
sizes = [max(0, expense_percentage), max(0, 100 - expense_percentage)]


conn = sqlite3.connect('finance_data.db')
merged_df.to_sql('FinanceData', conn, if_exists='replace', index=False)
conn.close()

# Query the database for data that meets specific criteria (Income > 2000 and Savings > 400).
try:
    conn = sqlite3.connect('finance_data.db')
    cursor = conn.cursor()
    
    query = '''
    SELECT 
        Month, Income, Expenses, Savings 
    FROM 
        FinanceData 
    WHERE 
        Income > 2000 
        AND Savings > 400 
    ORDER BY 
        Month ASC;
    '''
    
    filtered_df = pd.read_sql_query(query, conn)
    conn.close()
except sqlite3.Error as e:
    print(f"Database error: {e}")

if filtered_df.empty:
    print("No data found that meets the criteria (Income > 7000 AND Savings > 400).")
else:
    expense_percentage = filtered_df['Expenses'].sum() / filtered_df['Income'].sum() * 100
    labels = ['Expenses', 'Savings']
    sizes = [max(0, expense_percentage), max(0, 100 - expense_percentage)]

    conn = sqlite3.connect('finance_data.db')
    filtered_df.to_sql('FilteredFinanceData', conn, if_exists='replace', index=False)
    conn.close()
    # Create a figure
    plt.figure(figsize=(12, 6))

    plt.subplot(1, 2, 1)
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
    plt.title(f'Edgar Expense vs Savings Distribution\nMachine: {machine_name}\nIP: {ip_address}\n(Filtered: Income > 7000, Savings > 400)')

    plt.subplot(1, 2, 2)
    filtered_df.sort_values('Month', inplace=True)
    filtered_df.set_index('Month')['Savings'].plot(kind='line', marker='o', color='green')
    plt.title(f'Edgar Monthly Savings Trends\nMachine: {machine_name}\nIP: {ip_address}\n(Filtered: Income > 7000, Savings > 400)')
    plt.xlabel('Month')
    plt.ylabel('Savings ($)')

    plt.tight_layout()
    plt.show()