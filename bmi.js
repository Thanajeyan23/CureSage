document.getElementById('bmiForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get input values
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Determine BMI category
    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    // Display result
    document.getElementById('bmiValue').textContent = 'Your BMI is '+Math.round(bmi);
    document.getElementById('bmiCategory').textContent = 'Category: '+category;
});