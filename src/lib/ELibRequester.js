import PQueue from 'p-queue'


class ELibRequester{
    queue= new PQueue({concurrency:1, intervalCap:1, interval:1000*60*0.5})

    async send(func){
        return await this.queue.add(func)
    }
}

export default new ELibRequester()
