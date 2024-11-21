class Flashcard {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
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
            const flashcardContainer = document.getElementById('flashcard-container');
            flashcardContainer.innerHTML = `
                <div class="flashcard">
                    <p>${flashcard.question}</p>
                    <p>${flashcard.answer}</p>
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