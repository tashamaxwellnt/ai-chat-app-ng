import { Component, inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Chat, GeminiService } from '../gemini.service';
import { MarkdownComponent } from 'ngx-markdown';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [FormsModule, MarkdownComponent, NgClass],
  templateUrl: './shell.component.html',
  styles: ``
})
export class ShellComponent {
  prompt: string = "";
  chatHistory: Chat[] = []

  constructor(private geminiService: GeminiService){
    this.geminiService.getMessageHistory().subscribe( (message) => {
      if (message) {
        this.chatHistory.push(message)
      }
    })
  }

  sendPromt(){
    console.log("clicked!!");
    let data = this.prompt;
    this.prompt = '';
    if(data){
      this.geminiService.generateText(data);
    }
  }

}
