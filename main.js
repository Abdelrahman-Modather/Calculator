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
    
    const allGradeSelects = document.querySelectorAll('select[id^="igcse-"], select[id^="as-"], select[id^="alevel-"]');
    
    // Function to update available options
    function updateAvailableOptions() {
        allGradeSelects.forEach(select => {
            select.disabled = false;
            Array.from(select.options).forEach(option => {
                option.disabled = false;
            });
        });
    }

    // Add change event listener to all grade selects
    allGradeSelects.forEach(select => {
        select.addEventListener('change', updateAvailableOptions);
    });

    // Function to calculate the score
    function calculateScore() {
        // Reset animations
        document.querySelectorAll('.result-row').forEach(row => {
            row.classList.remove('show');
        });

        let totalPercentage = 0;
        let totalSubjects = 0;

        // Helper function to add grades
        function addGrades(elementId, percentage) {
            const count = parseInt(document.getElementById(elementId).value) || 0;
            if (count > 0) {
                totalPercentage += percentage * count;
                totalSubjects += count;
            }
        }

        // IGCSE Letter Grades
        addGrades('igcse-astar', 100);  // A* = 100%
        addGrades('igcse-a', 95);       // A  = 95%
        addGrades('igcse-b', 85);       // B  = 85%
        addGrades('igcse-c', 70);       // C  = 70%
        
        // IGCSE Numeric Grades
        addGrades('igcse-9', 100);      // 9 = A* = 100%
        addGrades('igcse-8', 100);      // 8 = A  = 100%
        addGrades('igcse-7', 95);       // 7 = B  = 95%
        addGrades('igcse-6', 88);       // 6 = C  = 88%
        addGrades('igcse-5', 82);       // 5 = c  = 82%
        addGrades('igcse-4', 70);       // 4 = E  = 70%

        // AS and A Levels
        addGrades('as-a', 95);          // A  = 95%
        addGrades('as-b', 85);          // B  = 85%
        addGrades('as-c', 70);          // C  = 70%
        addGrades('as-d', 60);          // D  = 60%

        addGrades('alevel-astar', 100); // A* = 100%
        addGrades('alevel-a', 95);      // A  = 95%
        addGrades('alevel-b', 85);      // B  = 85%
        addGrades('alevel-c', 70);      // C  = 70%
        addGrades('alevel-d', 60);      // D  = 60%

        // Calculate average percentage
        let averagePercentage = totalSubjects > 0 ? totalPercentage / totalSubjects : 0;

        // Calculate final score based on average percentage
        let finalScore = (averagePercentage / 100) * 410;

        // Apply 10% bonus if checkbox is checked
        const applyBonus = document.getElementById('factor-checkbox').checked;
        if (applyBonus) {
            finalScore = finalScore * 1.1; // Add 10% bonus
            averagePercentage = averagePercentage * 1.1; // Adjust percentage too
        }

        // Apply sports bonus if entered
        const sportsBonus = document.getElementById('sports-bonus').value;
        if (sportsBonus && !isNaN(sportsBonus)) {
            finalScore += parseFloat(sportsBonus);
            // Adjust percentage for sports bonus
            averagePercentage = (finalScore / 410) * 100;
        }

        // Cap percentage at 100%
        averagePercentage = Math.min(averagePercentage, 100);

        // Update display with 2 decimal places
        document.getElementById('score-percentage').textContent = averagePercentage.toFixed(2);
        document.getElementById('government-score').textContent = finalScore.toFixed(2);

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

        // Enable all selects and their options
        allGradeSelects.forEach(select => {
            select.disabled = false;
            Array.from(select.options).forEach(option => {
                option.disabled = false;
            });
        });
    }

    // Initial update of available options
    updateAvailableOptions();
});