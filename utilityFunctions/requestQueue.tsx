/** @format */

// utils/requestQueue.ts

class RequestQueue {
	private queue: (() => Promise<void>)[] = [];
	private isProcessing = false;
	private batchSize = 8;

	constructor(batchSize?: number) {
		if (batchSize) {
			this.batchSize = batchSize;
		}
	}

	async add(request: () => Promise<void>) {
		this.queue.push(request);
		await this.processQueue();
	}

	private async processQueue() {
		if (this.isProcessing) {
			return;
		}

		this.isProcessing = true;

		while (this.queue.length > 0) {
			const batch = this.queue.splice(0, this.batchSize);
			await Promise.all(batch.map((request) => request()));
		}

		this.isProcessing = false;
	}
}

export const imgRequestQueue = new RequestQueue(8);
export const audioRequestQueue = new RequestQueue(4);
