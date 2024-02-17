import { Component } from '@angular/core';
import { OpenaiService } from '../../services/openai.service'; // Adjust the path as per your project structure
import { OpenAIChatResponse } from 'src/app/interfaces/openai-response.interface';
import { Clipboard } from '@capacitor/clipboard';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.page.html',
  styleUrls: ['./diagnostic.page.scss'],
})
export class DiagnosticPage {
  messages = []; // Stores all the messages
  userInput = ''; // Stores the user input

  constructor(private openaiService: OpenaiService) { }

  // Sends the user input to the OpenAI API
  sendMessage() {
    if (!this.userInput.trim()) return;
    // Add the user input to the messages array
    this.messages.push({ role: 'user', content: this.userInput });
    // Send the user input to the OpenAI API
    this.openaiService.getResponse(this.messages).subscribe((response: OpenAIChatResponse) => {
      if (response.choices && response.choices.length > 0) {
        const aiMessage = response.choices[0].message.content;
        this.messages.push({ role: 'assistant', content: aiMessage });
      }
    });

    this.userInput = ''; // Clear the user input
  }

  // Uses the capacitor clipboard plugin to copy the last message to the clipboard
  copyToClipboard() {
    const message = this.messages[this.messages.length - 1].content;
    Clipboard.write({ string: message });
    Toast.show({ text: 'Copied to clipboard!' }); // Show a toast message using the capacitor toast plugin
  }
}
