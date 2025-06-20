import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    email: localStorage.getItem('email') || '',
  }),
  actions: {
    login(token: string, email: string) {
      this.token = token
      this.email = email
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
    },
    logout() {
      this.token = ''
      this.email = ''
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    },
    isAuthenticated(): boolean {
      return !!this.token
    },
    getName(): string {
      if (!this.token) return ''
      try {
        const payloadBase64 = this.token.split('.')[1]
        const decodedPayload = JSON.parse(atob(payloadBase64))
        return decodedPayload.name || ''
      } catch (e) {
        return ''
      }
    },
    isAdmin(): boolean {
      if (!this.token) return false
      try {
        const payloadBase64 = this.token.split('.')[1]
        const decodedPayload = JSON.parse(atob(payloadBase64))
        return decodedPayload.role === 'admin'
      } catch (e) {
        return false
      }
    }
  }
})
