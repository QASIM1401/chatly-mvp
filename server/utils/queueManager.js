class QueueManager {
  constructor() {
    this.queue = [];
    this.users = new Map();
    this.pairs = new Map();
  }

  enqueue(socketId) {
    const user = this.users.get(socketId);
    if (!user || this.queue.includes(socketId)) return;
    user.status = "searching";
    user.partnerId = null;
    this.queue.push(socketId);
  }

  addToQueue(socketId, userData) {
    if (this.users.has(socketId)) {
      return null;
    }
    const user = {
      socketId,
      username: userData.username,
      joinedAt: Date.now(),
      status: "searching",
      partnerId: null,
      lastPartnerId: null,
    };
    this.users.set(socketId, user);
    this.queue.push(socketId);
    return this.tryMatch();
  }

  requeueUser(socketId) {
    if (!this.users.has(socketId)) return null;
    this.enqueue(socketId);
    return this.tryMatch();
  }

  tryMatch() {
    while (this.queue.length >= 2) {
      const a = this.queue.shift();
      const b = this.queue.shift();
      if (!this.users.has(a) || !this.users.has(b)) {
        if (this.users.has(a) && !this.queue.includes(a)) this.queue.unshift(a);
        if (this.users.has(b) && !this.queue.includes(b)) this.queue.unshift(b);
        continue;
      }

      const userA = this.users.get(a);
      const userB = this.users.get(b);
      if (userA.lastPartnerId === b || userB.lastPartnerId === a) {
        if (this.queue.length === 0) {
          this.queue.unshift(b);
          this.queue.unshift(a);
          return null;
        }
        this.queue.push(b);
        this.queue.unshift(a);
        continue;
      }

      this.users.get(a).partnerId = b;
      this.users.get(b).partnerId = a;
      this.users.get(a).status = "connected";
      this.users.get(b).status = "connected";
      this.users.get(a).lastPartnerId = null;
      this.users.get(b).lastPartnerId = null;
      this.pairs.set(a, b);
      this.pairs.set(b, a);
      return { a, b };
    }
    return null;
  }

  removeUser(socketId, { requeuePartner = true } = {}) {
    const user = this.users.get(socketId);
    let partnerId = null;
    if (user && user.partnerId) {
      partnerId = user.partnerId;
      const partner = this.users.get(partnerId);
      if (partner) {
        partner.partnerId = null;
        partner.lastPartnerId = socketId;
        if (requeuePartner) {
          this.enqueue(partnerId);
        } else {
          partner.status = "idle";
        }
      }
      this.pairs.delete(socketId);
      this.pairs.delete(partnerId);
    }
    this.queue = this.queue.filter((id) => id !== socketId);
    this.users.delete(socketId);
    return partnerId;
  }

  breakPair(socketId, { requeueSelf = false, requeuePartner = true } = {}) {
    const user = this.users.get(socketId);
    if (!user) return null;

    const partnerId = user.partnerId;
    if (partnerId) {
      const partner = this.users.get(partnerId);
      if (partner) {
        partner.partnerId = null;
        partner.lastPartnerId = socketId;
        if (requeuePartner) {
          this.enqueue(partnerId);
        } else {
          partner.status = "idle";
        }
      }
      this.pairs.delete(socketId);
      this.pairs.delete(partnerId);
    }

    user.partnerId = null;
    user.lastPartnerId = partnerId;
    if (requeueSelf) {
      this.enqueue(socketId);
    } else {
      user.status = "idle";
      this.queue = this.queue.filter((id) => id !== socketId);
    }

    return partnerId;
  }

  getPartner(socketId) {
    return this.users.get(socketId)?.partnerId || null;
  }

  isPaired(socketId) {
    return this.pairs.has(socketId);
  }

  getOnlineCount() {
    return this.users.size;
  }

  getUser(socketId) {
    return this.users.get(socketId);
  }
}

export default new QueueManager();
