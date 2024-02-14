export class Service{
  constructor (dao){
      this.dao= dao
  }

  async addTickets(ticketData){
      const ticket = await this.dao.create(ticketData)
      return ticket
  }

  async getTicket(searchData){
      return await this.dao.read(searchData)
  }

  async getTickets(searchData){
      return await this.dao.readMany(searchData)
  }

  async putTicket(searchData,ticketData){
      return await this.dao.update(searchData,ticketData)
  }


  async deleteTicket(searchData){
      return await this.dao.delete(searchData)
  }


}