import { Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChatPersona, ChatService } from '../../../services/chat/chat.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnDestroy {

  readonly chatService = inject(ChatService);
  private readonly destroy$ = new Subject<void>();
  readonly persona$ = this.chatService.persona$;

  isOpen = false;
  persona: ChatPersona | null = null;

  messages: ChatMessage[] = [];
  input = '';
  loading = false;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef<HTMLElement>;

  constructor() {
    // suscripciones
    this.chatService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(open => {
        this.isOpen = open;
        if (!open) {
        } else {
          setTimeout(() => this.scrollToBottom(), 50);
        }
      });

    this.chatService.persona$
      .pipe(takeUntil(this.destroy$))
      .subscribe(persona => {
        this.persona = persona;

        this.messages = [];
      });
  }

  async send() {
    const text = this.input.trim();
    if (!text || this.loading) return;

    this.messages.push({ role: 'user', content: text });
    this.input = '';
    this.loading = true;
    this.scrollToBottom();

    try {
      const reply = await this.chatService.sendMessage(text);
      this.messages.push({ role: 'assistant', content: reply });
      this.scrollToBottom();
    } catch (err) {
      this.messages.push({ role: 'assistant', content: 'Error al obtener respuesta.' });
      this.scrollToBottom();
    } finally {
      this.loading = false;
    }
  }

  toggleOpen() {
  if (this.isOpen) {
    this.chatService.closeChat();
  } else {
    this.chatService.openChat(this.persona?.user ?? null as any);
  }
}
  trackByIndex(index: number): number {
  return index;
  }

  close() {
    this.chatService.closeChat();
  }

  private scrollToBottom() {
    try {
      const el = this.scrollContainer?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    } catch {}
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}