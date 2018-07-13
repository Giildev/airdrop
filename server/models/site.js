const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  banner: String,
  header: {
    ES: {
      title: String,
      description: String
    },
    EN: {
      title: String,
      description: String
    }
  },
  middleSection: {
    ES: {
      title: String,
      description: String
    },
    EN: {
      title: String,
      description: String
    }
  },
  donationFundsAmount: {
    raised: String,
    goal: String
  },
  donationCerfiedUsersAmount: {
    raised: String,
    goal: String
  },
  timeline: {
    ES: {
      title: String,
      description: String
    },
    EN: {
      title: String,
      description: String
    },
    lines: [{ type: Schema.ObjectId, ref: 'timeline' }]
  },
  about: {
    ES: {
      title: String,
      description: String
    },
    EN: {
      title: String,
      description: String
    }
  },
  story: {
    ES: {
      title: String,
      description: String
    },
    EN: {
      title: String,
      description: String
    }
  },
  mail: {
    ES: {
      title: String,
      description: String
    },
    EN: {
      title: String,
      description: String
    }
  },
  faq: {
    ES: {
      title: String,
      description: String
    },
    EN: {
      title: String,
      description: String
    }
  },
  contactUs: {
    ES: {
      title: String,
      description: String
    },
    EN: {
      title: String,
      description: String
    }
  },
  donation: {
    ES: {
      title: String,
      description: String,
      warningText: String,
      bottomText: String,
    },
    EN: {
      title: String,
      description: String,
      warningText: String,
      bottomText: String,
    }
  },
  social_media: [{ rrss: String, url: String }],
  stories: [{ type: Schema.ObjectId, ref: 'story' }],
  donations: [{ type: Schema.ObjectId, ref: 'donation' }],
  faqs: [{ type: Schema.ObjectId, ref: 'faq' }]
});

const Site = mongoose.model("site", siteSchema);

module.exports = Site;
