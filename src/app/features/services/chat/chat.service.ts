// src/app/services/chat/chat.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GoogleGenAI } from '@google/genai';
import { User } from '../../../models/User.model';
import { env } from '../../../../enviroments/enviroment.prod';

export interface ChatPersona {
  user: User;
  roleDescription: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private static readonly MODEL = 'gemini-2.5-flash';

  private readonly genAI = new GoogleGenAI({ apiKey: env.GOOGLE_API_KEY });

  // estado observable
  private readonly isOpenSubject = new BehaviorSubject<boolean>(false);
  readonly isOpen$ = this.isOpenSubject.asObservable();

  private readonly personaSubject = new BehaviorSubject<ChatPersona | null>(null);
  readonly persona$ = this.personaSubject.asObservable();

  openChat(user: User) {
    const persona: ChatPersona = {
      user,
      roleDescription: this.buildPersonaFromUser(user)
    };

    this.personaSubject.next(persona);
    this.isOpenSubject.next(true);
  }

  closeChat() {
    this.isOpenSubject.next(false);

  }


  async sendMessage(message: string): Promise<string> {
  const persona = this.personaSubject.value;

  const systemInstruction = persona
    ? `${persona.roleDescription}
Responde en primera persona, breve y profesional.`
    : `Eres el asistente del portafolio de Juan Camilo.
Responde breve y profesional.`;

  try {
    const result = await this.genAI.models.generateContent({
      model: ChatService.MODEL,
      contents: message,
      config: {
        systemInstruction
      }
    });

    return result.text ?? 'Sin respuesta del modelo.';
  } catch (error) {
    console.error('[ChatService] Error al solicitar modelo:', error);
    throw error;
  }
}

  private buildPersonaFromUser(user: User): string {

    return [
      `Eres ${user.firstName} ${user.lastName}.`,
      user.company?.title ? `Trabajas como ${user.company.title} en ${user.company.name}.` : '',
      user.address?.city ? `Vives en ${user.address.city}, ${user.address.country}.` : '',
      user.university ? `Estudiaste en ${user.university}.` : '',
      `Habla en primera persona y mantén un tono acorde a un perfil real.`,
      `Responde de forma amigable y creativa, como lo haría ${user.firstName}.`
    ].filter(Boolean).join(' ');

  }
}