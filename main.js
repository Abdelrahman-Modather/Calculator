document.addEventListener('DOMContentLoaded', function() {
    //burger menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    // Get all grade selects
    const allSelects = document.querySelectorAll('select');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Set up click event for calculate button
    calculateBtn.addEventListener('click', calculateScore);
    
    // Set up click event for reset button
    resetBtn.addEventListener('click', resetForm);
    
    // Function to show results with animation
    function showResults() {
        const results = document.querySelectorAll('.result-row');
        results.forEach((result, index) => {
            setTimeout(() => {
                result.classList.add('show');
            }, index * 100);
        });
    }
    
    // Function to calculate the score
    function calculateScore() {
        // Reset animations first
        document.querySelectorAll('.result-row').forEach(row => {
            row.classList.remove('show');
        });

        let totalSubjects = 0;
        let totalScore = 0;
        const maxPossibleScore = 410;

        // Helper function to add grades
        function addGrades(elementId, value) {
            const count = parseInt(document.getElementById(elementId).value);
            if (count > 0) {
                totalSubjects += count;
                totalScore += count * value;
            }
        }

        // IGCSE Letter Grades
        addGrades('igcse-astar', 9);
        addGrades('igcse-a', 8);
        addGrades('igcse-b', 7);
        addGrades('igcse-c', 6);

        // IGCSE Numeric Grades
        addGrades('igcse-9', 9);
        addGrades('igcse-8', 8);
        addGrades('igcse-7', 7);
        addGrades('igcse-6', 6);
        addGrades('igcse-5', 5);
        addGrades('igcse-4', 4);

        // AS Levels
        addGrades('as-a', 10);
        addGrades('as-b', 8);
        addGrades('as-c', 6);
        addGrades('as-d', 4);

        // A Levels
        addGrades('alevel-astar', 20);
        addGrades('alevel-a', 16);
        addGrades('alevel-b', 12);
        addGrades('alevel-c', 8);
        addGrades('alevel-d', 4);

        // Calculate percentage per subject
        let percentagePerSubject = 0;
        if (totalSubjects > 0) {
            percentagePerSubject = 70 / totalSubjects; // 70% divided by number of subjects
        }

        // Calculate final score
        let finalScore = (percentagePerSubject * maxPossibleScore) / 100;

        // Apply factor if checked
        const withFactor = document.getElementById('factor-checkbox').checked;
        if (withFactor) {
            finalScore = Math.round(finalScore * 1.1); // 10% bonus
        }

        // Apply sports bonus if entered
        const sportsBonus = document.getElementById('sports-bonus').value;
        if (sportsBonus && !isNaN(sportsBonus)) {
            finalScore += parseInt(sportsBonus);
        }

        // Calculate final percentage
        const percentage = Math.round((finalScore / maxPossibleScore) * 100);

        // Update display
        document.getElementById('score-percentage').textContent = percentage;
        document.getElementById('government-score').textContent = Math.round(finalScore);

        // Show results with animation
        setTimeout(showResults, 100);
    }
    
    // Function to reset the form
    function resetForm() {
        // Reset all selects to first option
        allSelects.forEach(select => {
            select.selectedIndex = 0;
        });
        
        // Uncheck checkbox
        document.getElementById('factor-checkbox').checked = false;
        
        // Clear sports bonus
        document.getElementById('sports-bonus').value = '';
        
        // Reset results
        document.getElementById('score-percentage').textContent = '0';
        document.getElementById('government-score').textContent = '0';

        // Reset animations
        document.querySelectorAll('.result-row').forEach(row => {
            row.classList.remove('show');
        });
    }
});