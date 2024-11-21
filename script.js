class Flashcard {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.isFlipped = false;
    }
}

class FlashcardSystem {
    constructor() {
        this.flashcards = [];
        this.currentIndex = 0;
    }

    addFlashcard(question, answer) {
        const flashcard = new Flashcard(question, answer);
        this.flashcards.push(flashcard);
    }

    removeFlashcard(index) {
        if (index >= 0 && index < this.flashcards.length) {
            this.flashcards.splice(index, 1);
        }
    }

    displayFlashcard(index) {
        if (index >= 0 && index < this.flashcards.length) {
            const flashcard = this.flashcards[index];
            const flashcardContainer = document.getElementById('flashcard');
            flashcardContainer.innerHTML = `
                <div class="flashcard ${flashcard.isFlipped ? 'flipped' : ''}">
                    <p class="front">${flashcard.question}</p>
                    <p class="back">${flashcard.answer}</p>
                </div>
            `;
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
        const flashcard = this.flashcards[this.currentIndex];
        flashcard.isFlipped = !flashcard.isFlipped;
        this.displayFlashcard(this.currentIndex);
    }
}

const flashcardSystem = new FlashcardSystem();
flashcardSystem.addFlashcard('What is the capital of France?', 'Paris');
flashcardSystem.addFlashcard('What is 2 + 2?', '4');
flashcardSystem.displayFlashcard(0);

document.getElementById('next-btn').addEventListener('click', () => {
    flashcardSystem.nextFlashcard();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    flashcardSystem.prevFlashcard();
});

document.getElementById('flashcard').addEventListener('click', () => {
    flashcardSystem.flipFlashcard();
});

document.getElementById('flashcard').addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        flashcardSystem.flipFlashcard();
    } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
        flashcardSystem.prevFlashcard();
    } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
        flashcardSystem.nextFlashcard();
    }
});
