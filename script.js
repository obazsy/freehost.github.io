$(document).ready(function() {
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const $numberContainer = $(entry.target);
              var $number = $numberContainer.find('.count').length ? $numberContainer.find('.count') : $numberContainer;
              var countTo = $number.data('count');
              var additionalText = $numberContainer.find('.years').text();

              $({ countNum: 0 }).animate({
                  countNum: countTo
              }, {
                  duration: 3000,
                  easing: 'linear',
                  step: function() {
                      $number.text(Math.floor(this.countNum));
                  },
                  complete: function() {
                      $number.text(this.countNum);
                      // Append the additional text only once after the number has been animated
                      if (additionalText) {
                          $numberContainer.find('.years').remove(); // Remove the original to prevent duplication
                          $number.after(' <span class="years">' + additionalText + '</span>');
                      }
                  }
              });
              
              observer.unobserve(entry.target); // Stop observing once the animation starts
          }
      });
  }, {
      threshold: 0.5 // Trigger when 50% of the element is visible
  });

  $('.stat-box .number').each(function() {
      observer.observe(this); // Observe each number container
  });
});


  










  document.addEventListener('DOMContentLoaded', function() {
    const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek"];
    const classSelector = document.getElementById('classSelector');
    const weeklySchedule = document.getElementById('weeklySchedule');
    const prevWeekBtn = document.getElementById('prevWeek');
    const nextWeekBtn = document.getElementById('nextWeek');
    const modal = document.getElementById('myModal');
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1));
    let currentWeekIndex = 0;

    const classSchedules = {
        class1: {
            0: [], // Monday
            1: [new Array(16).fill({sport: '', time: '', instructor: ''}), new Array(16).fill({sport: '', time: '', instructor: ''})],
            2: [],
            3: [],
            4: [new Array(16).fill({sport: '', time: '', instructor: ''}), new Array(16).fill({sport: '', time: '', instructor: ''})]
        },
        class2: {
            0: [],
            1: [new Array(16).fill({sport: '', time: '', instructor: ''}), new Array(16).fill({sport: '', time: '', instructor: ''})],
            2: [],
            3: [],
            4: []
        },
        class3: {
            0: [],
            1: [],
            2: [],
            3: [new Array(16).fill({sport: '', time: '', instructor: ''}), new Array(16).fill({sport: '', time: '', instructor: ''})],
            4: []
        }
    };

    classSchedules.class1[4][0][0] = { sport: 'Yoga', time: '6:00 - 7:00', instructor: 'John Doe' };
    classSchedules.class1[1][1][10] = { sport: 'Crossfit', time: '16:00 - 17:00', instructor: 'Jane Doe' };

    function updateWeekDays() {
      let today = new Date();
      let todayFormatted = `${today.getFullYear()}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getDate().toString().padStart(2, '0')}`;
  
      for (let i = 0; i < 5; i++) {
          let dayCell = document.getElementById(`day${i + 1}`);
          let newDate = new Date(currentDate.getTime()); // Clone currentDate
          newDate.setDate(newDate.getDate() + i); // Increment to set correct dates
          let formattedDate = `${newDate.getFullYear()}.${(newDate.getMonth() + 1).toString().padStart(2, '0')}.${newDate.getDate().toString().padStart(2, '0')}`;
          dayCell.innerHTML = `${days[i]}<br>${formattedDate}`;
  
          // Highlight the current date if it matches
          if (formattedDate === todayFormatted) {
              dayCell.classList.add('highlight-column');
          } else {
              dayCell.classList.remove('highlight-column');
          }
      }
  }
  

    function updateSchedule() {
        const selectedClass = classSelector.value;
        const classData = classSchedules[selectedClass] || {};
        for (let day = 0; day < 5; day++) {
            const daySchedule = classData[day] || [];
            const weekSchedule = daySchedule[currentWeekIndex] || new Array(16).fill({sport: '', time: '', instructor: ''});
            for (let hour = 0; hour < 16; hour++) {
                const cell = weeklySchedule.querySelector(`tbody tr:nth-child(${hour + 1}) td:nth-child(${day + 2})`);
                const activity = weekSchedule[hour];
                cell.innerHTML = activity && activity.sport ? `<div class="lesson-info" data-info="${activity.sport},${activity.time},${activity.instructor}">
                    ${activity.sport} at ${activity.time} by ${activity.instructor}
                </div>` : '';
            }
        }
    }
    

    classSelector.addEventListener('change', updateSchedule);

    prevWeekBtn.addEventListener('click', () => {
        if (currentWeekIndex > 0) {
            currentWeekIndex--;
            currentDate.setDate(currentDate.getDate() - 7);
            updateSchedule();
            updateWeekDays();
        }
    });

    nextWeekBtn.addEventListener('click', () => {
        if (currentWeekIndex < Object.keys(classSchedules[classSelector.value]).length - 1) {
            currentWeekIndex++;
            currentDate.setDate(currentDate.getDate() + 7);
            updateSchedule();
            updateWeekDays();
        }
    });

    weeklySchedule.addEventListener('click', function(event) {
        if (event.target.classList.contains('lesson-info')) {
            const lessonDetails = event.target.getAttribute('data-info').split(',');
            showModal(lessonDetails[0], lessonDetails[1], lessonDetails[2]);
        }
    });

    function showModal(sport, time, instructor) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = `<span class="close">&times;</span>
            <div class="modal-details">
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Sport:</strong> ${sport}</p>
                <p><strong>Instructor:</strong> ${instructor}</p>
            </div>`;
        modal.style.display = 'block';
        modalContent.querySelector('.close').addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Initial calls to set everything up
    updateWeekDays();
    updateSchedule();
});
