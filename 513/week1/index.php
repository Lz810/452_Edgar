<?php
// 读取 meal_plan.json 文件内容
$mealPlanJson = file_get_contents('meal_plan.json');
$mealPlan = json_decode($mealPlanJson, true);

// 检查 JSON 解析是否成功
if (json_last_error() !== JSON_ERROR_NONE) {
    $error = "Error parsing meal plan: " . json_last_error_msg();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edgar Weekly Meal Plan</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <h1>Edgar Weekly Meal Plan</h1>
  <table id="mealPlanTable">
    <thead>
      <tr>
        <th>Day</th>
        <th>Meal</th>
      </tr>
    </thead>
    <tbody>
      <?php if (isset($error)): ?>
        <tr>
          <td colspan="2"><?php echo $error; ?></td>
        </tr>
      <?php else: ?>
        <?php foreach ($mealPlan as $day => $meal): ?>
          <tr>
            <td><?php echo htmlspecialchars($day); ?></td>
            <td><?php echo htmlspecialchars($meal); ?></td>
          </tr>
        <?php endforeach; ?>
      <?php endif; ?>
    </tbody>
  </table>
  <div class="btn-container">
    <button id="regenerateBtn" onclick="window.location.reload()">Regenerate Plan</button>
  </div>
</body>

</html>