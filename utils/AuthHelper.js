import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from "base-64"; global.atob = decode;

export class AuthHelper {
  
  static #accessToken = null;

  static async retrieveToken(){
    this.#accessToken = await AsyncStorage.getItem('accessToken');
    console.log("AcessToken salvo",this.#accessToken)
  }

  static async setAccessToken(token) {
    
    this.#accessToken = token;
    
    await AsyncStorage.setItem('accessToken', token);
  
  }

  static async getAccessToken() {
    console.log("access token ", this.#accessToken);
    if (!this.#accessToken) {
      
      this.#accessToken = await AsyncStorage.getItem('accessToken');
    
    }
    
    return this.#accessToken;
  }

  static getAuthHeader() {
  
    if (this.#accessToken) {
  
      return {
  
        'Authorization': `Bearer ${this.#accessToken}`
  
      };
  
    }
  
    return {};
  }

  static async clearAccessToken() {
  
    this.#accessToken = null;
    
    await AsyncStorage.removeItem('accessToken');
  
  }

  static isTokenExpired() {
    
    if (!this.#accessToken) {
    
      return true;
    
    }
    try {
    
      const payload = JSON.parse(atob(this.#accessToken.split('.')[1]));
    
      const currentTime = Date.now() / 1000;
    
      return payload.exp < currentTime;
    
    }
    catch (error) {
    
      console.log('Erro ao verificar expiração do token:', error);
    
      return true;
    
    }
  }

  static getTokenExpirationTime() {
    
    if (!this.#accessToken) {
    
      return null;
    
    }
    try {
    
      const payload = JSON.parse(atob(this.#accessToken.split('.')[1]));
    
      return new Date(payload.exp * 1000);
    
    }
    
    catch (error) {
    
      console.log('Erro ao obter tempo de expiração do token:', error);
    
      return null;
    
    }
  }

  static getTimeUntilExpiration() {
    
    const expirationTime = this.getTokenExpirationTime();
    
    if (!expirationTime) {
      return null;
    }

    return Math.max(0, expirationTime - new Date());
  }

  static getUserIdFromToken() {
    
    if (!this.#accessToken) {
    
      return null;
    
    }

    try {
    
      const payload = JSON.parse(atob(this.#accessToken.split('.')[1]));
    
      return payload.sub;

    }
      catch (error) {
    
        console.log('Erro ao obter userId do token:', error);
      return null;
    
    }

  }

  static async getUserRole() {
    const token = await this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.roleId || payload.role || 2;
    } catch (error) {
      console.log('Erro ao decodificar role:', error);
      return null;
    }
  }
}
