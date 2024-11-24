class Flashcard {
  constructor(question, answer) {
    this.question = question.trim();
    this.answer = answer.trim();
    this.isFlipped = false;
  }
}

class FlashcardSystem {
  constructor() {
    this.flashcards = [];
    this.currentIndex = 0;
    this.initializeEventListeners();
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      parsedCards.forEach(card => {
        this.addFlashcard(card.question, card.answer);
      });
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('flashcards', JSON.stringify(this.flashcards));
  }

  showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }

  updateProgressIndicator() {
    const currentCard = document.getElementById('current-card');
    const totalCards = document.getElementById('total-cards');
    currentCard.textContent = this.flashcards.length > 0 ? this.currentIndex + 1 : 0;
    totalCards.textContent = this.flashcards.length;
  }

  addFlashcard(question, answer) {
    if (!question.trim() || !answer.trim()) {
      this.showNotification('Question and answer cannot be empty!', 'error');
      return false;
    }
    const flashcard = new Flashcard(question, answer);
    this.flashcards.push(flashcard);
    this.saveToLocalStorage();
    this.updateProgressIndicator();
    this.showNotification('Flashcard added successfully!', 'success');
    return true;
  }

  removeFlashcard(index) {
    if (index >= 0 && index < this.flashcards.length) {
      this.flashcards.splice(index, 1);
      if (this.currentIndex >= this.flashcards.length) {
        this.currentIndex = Math.max(0, this.flashcards.length - 1);
      }
      this.saveToLocalStorage();
      this.updateProgressIndicator();
      this.displayFlashcard(this.currentIndex);
    }
  }

  displayFlashcard(index) {
    const flashcardElement = document.getElementById('flashcard');
    if (this.flashcards.length === 0) {
      flashcardElement.innerHTML = '<div class="empty-state">No flashcards available. Add some!</div>';
      return;
    }

    if (index >= 0 && index < this.flashcards.length) {
      const flashcard = this.flashcards[index];
      flashcardElement.innerHTML = `
        <div class="flashcard ${flashcard.isFlipped ? 'flipped' : ''}" role="region" aria-label="${flashcard.isFlipped ? 'Answer' : 'Question'}">
          <div class="front">${flashcard.question}</div>
          <div class="back">${flashcard.answer}</div>
        </div>
      `;
      this.updateProgressIndicator();
    }
  }

  nextFlashcard() {
    if (this.currentIndex < this.flashcards.length - 1) {
      this.currentIndex++;
      this.displayFlashcard(this.currentIndex);
    }
  }

  prevFlashcard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.displayFlashcard(this.currentIndex);
    }
  }

  flipFlashcard() {
    if (this.flashcards.length === 0) return;
    const flashcard = this.flashcards[this.currentIndex];
    flashcard.isFlipped = !flashcard.isFlipped;
    this.displayFlashcard(this.currentIndex);
  }

  initializeEventListeners() {
    document.getElementById('flashcard-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const questionInput = document.getElementById('question-input');
      const answerInput = document.getElementById('answer-input');
      
      if (this.addFlashcard(questionInput.value, answerInput.value)) {
        questionInput.value = '';
        answerInput.value = '';
        this.displayFlashcard(this.flashcards.length - 1);
      }
    });

    document.getElementById('next-btn').addEventListener('click', () => this.nextFlashcard());
    document.getElementById('prev-btn').addEventListener('click', () => this.prevFlashcard());
    document.getElementById('flashcard').addEventListener('click', () => this.flipFlashcard());

    document.addEventListener('keydown', (event) => {
      if (document.activeElement.tagName === 'INPUT') return;
      
      switch(event.code) {
        case 'Space':
          event.preventDefault();
          this.flipFlashcard();
          break;
        case 'ArrowLeft':
        case 'KeyA':
          event.preventDefault();
          this.prevFlashcard();
          break;
        case 'ArrowRight':
        case 'KeyD':
          event.preventDefault();
          this.nextFlashcard();
          break;
      }
    });
  }
}

// Initialize the system
const flashcardSystem = new FlashcardSystem();
flashcardSystem.displayFlashcard(0);
