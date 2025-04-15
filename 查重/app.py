from flask import Flask, render_template, request, send_file
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt'}  # 若需支持 .tex 文件，改为 {'txt', 'tex'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # 处理文件上传
        for week in range(1, 9):
            week_field = f'week{week}'
            if week_field in request.files:
                file = request.files[week_field]
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    week_dir = os.path.join(UPLOAD_FOLDER, f'Week{week}')
                    os.makedirs(week_dir, exist_ok=True)
                    file.save(os.path.join(week_dir, filename))
        
        # 上传成功后，重新获取文件列表（关键修复步骤）
        week_files = {}
        for week in range(1, 9):
            week_dir = os.path.join(UPLOAD_FOLDER, f'Week{week}')
            files = os.listdir(week_dir) if os.path.exists(week_dir) else []
            week_files[f'Week{week}'] = files
        
        return render_template('upload.html', message="文件上传成功！", week_files=week_files)  # 传递 week_files
    
    # GET 请求时的逻辑不变
    week_files = {}
    for week in range(1, 9):
        week_dir = os.path.join(UPLOAD_FOLDER, f'Week{week}')
        files = os.listdir(week_dir) if os.path.exists(week_dir) else []
        week_files[f'Week{week}'] = files
    
    return render_template('upload.html', week_files=week_files)

if __name__ == '__main__':
    app.run(debug=True, port=5000)