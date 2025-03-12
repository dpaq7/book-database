import { apiService } from './api.js';
import { uiService } from './ui.js';

// Challenge Service for handling reading challenge operations
export const challengeService = {
  challenges: [],
  
  // Initialize the challenge service
  init() {
    // Nothing specific to initialize
  },
  
  // Load all reading challenges
  async loadChallenges() {
    try {
      // Get challenges from API
      const challenges = await apiService.getChallenges();
      this.challenges = challenges;
      
      // Render challenges
      this.renderChallenges(challenges);
      
      // Create reading progress chart
      this.createReadingProgressChart(challenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
      uiService.showToast('Error loading reading challenges', 'danger');
    }
  },
  
  // Render challenges
  renderChallenges(challenges) {
    // Render current year challenge
    this.renderCurrentChallenge(challenges);
    
    // Render past challenges
    this.renderPastChallenges(challenges);
  },
  
  // Render current year challenge
  renderCurrentChallenge(challenges) {
    const currentYear = new Date().getFullYear();
    const currentChallenge = challenges.find(c => c.year === currentYear);
    
    const currentChallengeElement = document.getElementById('current-challenge');
    
    if (!currentChallenge) {
      currentChallengeElement.innerHTML = `
        <div class="text-center py-4">
          <p>No reading challenge set for ${currentYear}</p>
          <button class="btn btn-primary" id="new-challenge-btn">
            <i class="bi bi-plus-lg me-2"></i>Set a Reading Goal
          </button>
        </div>
      `;
      
      // Add event listener to new challenge button
      const newChallengeBtn = document.getElementById('new-challenge-btn');
      newChallengeBtn.addEventListener('click', () => {
        uiService.showChallengeModal();
      });
      
      return;
    }
    
    // Calculate progress percentage
    const progressPercent = Math.min(100, Math.round((currentChallenge.completed / currentChallenge.goal) * 100));
    
    // Determine progress bar color
    let progressColor = 'bg-success';
    if (progressPercent < 25) {
      progressColor = 'bg-danger';
    } else if (progressPercent < 50) {
      progressColor = 'bg-warning';
    } else if (progressPercent < 75) {
      progressColor = 'bg-info';
    }
    
    currentChallengeElement.innerHTML = `
      <div class="challenge-card">
        <h2 class="text-center mb-3">${currentYear} Reading Challenge</h2>
        <div class="text-center mb-4">
          <h3>
            <span class="badge ${progressPercent >= 100 ? 'bg-success' : 'bg-primary'}">
              ${currentChallenge.completed} of ${currentChallenge.goal} books
            </span>
          </h3>
        </div>
        <div class="progress challenge-progress">
          <div class="progress-bar ${progressColor}" role="progressbar" 
            style="width: ${progressPercent}%" 
            aria-valuenow="${progressPercent}" 
            aria-valuemin="0" 
            aria-valuemax="100">
            ${progressPercent}%
          </div>
        </div>
        <div class="challenge-info">
          <span>Started: ${new Date(currentChallenge.createdAt).toLocaleDateString()}</span>
          <span>${currentChallenge.goal - currentChallenge.completed} books to go</span>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-outline-primary edit-challenge-btn" data-year="${currentChallenge.year}">
            <i class="bi bi-pencil me-2"></i>Edit Challenge
          </button>
        </div>
      </div>
    `;
    
    // Add event listener to edit challenge button
    const editChallengeBtn = document.querySelector('.edit-challenge-btn');
    editChallengeBtn.addEventListener('click', () => {
      this.editChallenge(currentChallenge.year);
    });
  },
  
  // Render past challenges
  renderPastChallenges(challenges) {
    const currentYear = new Date().getFullYear();
    const pastChallenges = challenges.filter(c => c.year !== currentYear).sort((a, b) => b.year - a.year);
    
    const pastChallengesElement = document.getElementById('past-challenges');
    
    if (pastChallenges.length === 0) {
      pastChallengesElement.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">No past reading challenges</td>
        </tr>
      `;
      return;
    }
    
    pastChallengesElement.innerHTML = '';
    
    pastChallenges.forEach(challenge => {
      // Calculate progress percentage
      const progressPercent = Math.min(100, Math.round((challenge.completed / challenge.goal) * 100));
      
      // Determine progress bar color
      let progressColor = 'bg-success';
      if (progressPercent < 25) {
        progressColor = 'bg-danger';
      } else if (progressPercent < 50) {
        progressColor = 'bg-warning';
      } else if (progressPercent < 75) {
        progressColor = 'bg-info';
      }
      
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${challenge.year}</td>
        <td>${challenge.goal}</td>
        <td>${challenge.completed}</td>
        <td>
          <div class="progress">
            <div class="progress-bar ${progressColor}" role="progressbar" 
              style="width: ${progressPercent}%" 
              aria-valuenow="${progressPercent}" 
              aria-valuemin="0" 
              aria-valuemax="100">
              ${progressPercent}%
            </div>
          </div>
        </td>
      `;
      
      pastChallengesElement.appendChild(row);
    });
  },
  
  // Create reading progress chart
  createReadingProgressChart(challenges) {
    const currentYear = new Date().getFullYear();
    const currentChallenge = challenges.find(c => c.year === currentYear);
    
    if (!currentChallenge) {
      return;
    }
    
    const ctx = document.getElementById('reading-progress-chart').getContext('2d');
    
    // Get monthly data (this would normally come from the API)
    // For now, we'll create mock data
    const monthlyData = this.generateMonthlyData(currentChallenge.completed);
    
    // Calculate target line (goal divided by 12 months, cumulative)
    const targetLine = Array(12).fill(0).map((_, i) => {
      return Math.round(((i + 1) / 12) * currentChallenge.goal);
    });
    
    // Create chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Books Read',
            data: monthlyData.cumulative,
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Target',
            data: targetLine,
            borderColor: 'rgba(220, 53, 69, 0.5)',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.parsed.y;
                return `${label}: ${value} books`;
              }
            }
          }
        }
      }
    });
  },
  
  // Generate monthly reading data (mock data)
  generateMonthlyData(totalBooks) {
    const currentMonth = new Date().getMonth();
    
    // Generate random monthly counts that sum to totalBooks
    const monthlyCount = Array(12).fill(0);
    
    // Only fill months up to current month
    let remaining = totalBooks;
    for (let i = 0; i <= currentMonth; i++) {
      if (i === currentMonth) {
        monthlyCount[i] = remaining;
      } else {
        const count = Math.floor(Math.random() * (remaining / 2)) + 1;
        monthlyCount[i] = Math.min(count, remaining);
        remaining -= monthlyCount[i];
      }
      
      if (remaining <= 0) break;
    }
    
    // Calculate cumulative counts
    const cumulativeCount = [];
    let sum = 0;
    
    for (let i = 0; i < 12; i++) {
      sum += monthlyCount[i];
      cumulativeCount.push(sum);
    }
    
    return {
      monthly: monthlyCount,
      cumulative: cumulativeCount
    };
  },
  
  // Save challenge
  async saveChallenge() {
    try {
      // Get form data
      const year = parseInt(document.getElementById('challenge-year').value);
      const goal = parseInt(document.getElementById('challenge-goal').value);
      
      if (!year || !goal) {
        uiService.showToast('Please fill in all fields', 'warning');
        return;
      }
      
      // Check if challenge for this year already exists
      const existingChallenge = this.challenges.find(c => c.year === year);
      
      if (existingChallenge) {
        // Update existing challenge
        await apiService.updateChallenge(year, { goal, completed: existingChallenge.completed });
        uiService.showToast('Reading challenge updated', 'success');
      } else {
        // Create new challenge
        await apiService.createChallenge({ year, goal });
        uiService.showToast('Reading challenge created', 'success');
      }
      
      // Hide modal
      uiService.challengeModal.hide();
      
      // Reload challenges
      this.loadChallenges();
    } catch (error) {
      console.error('Error saving challenge:', error);
      uiService.showToast('Error saving reading challenge', 'danger');
    }
  },
  
  // Edit challenge
  editChallenge(year) {
    const challenge = this.challenges.find(c => c.year === year);
    
    if (challenge) {
      uiService.showChallengeModal(challenge);
    }
  }
};
