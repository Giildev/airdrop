const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const db = require("../libs/db-connection");
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  banner: String,
  header: {
    es: {
      title: String,
      description: String
    },
    en: {
      title: String,
      description: String
    }
  },
  middleSection: {
    es: {
      title: String,
      description: String
    },
    en: {
      title: String,
      description: String
    }
  },
  donationFundsAmount: {
    en:{
      title: String
    },
    es:{
      title: String
    },
    raised: String,
    goal: String
  },
  donationCerfiedUsersAmount: {
    en:{
        title: String
      },
      es: {
        title: String
      },
    raised: String,
    goal: String
  },
  timeline: {
    es: {
      title: String,
      description: String
    },
    en: {
      title: String,
      description: String
    },
    lines: [{ type: Schema.ObjectId, ref: 'timeline' }]
  },
  about: {
    es: {
      title: String,
      author: String,
      description: String
    },
    en: {
      title: String,
      author: String,
      description: String
    }
  },
  story: {
    es: {
      title: String,
      description: String
    },
    en: {
      title: String,
      description: String
    }
  },
  mail: {
    es: {
      title: String,
      description: String
    },
    en: {
      title: String,
      description: String
    }
  },
  faq: {
    es: {
      title: String,
      description: String
    },
    en: {
      title: String,
      description: String
    }
  },
  contactUs: {
    es: {
      title: String,
      description: String
    },
    en: {
      title: String,
      description: String
    }
  },
  donation: {
    es: {
      title: String,
      description: String,
      warningText: String,
      bottomText: String,
    },
    en: {
      title: String,
      description: String,
      warningText: String,
      bottomText: String,
    }
  },
  social_media: [{ rrss: String, url: String }],
  stories: [{ type: Schema.ObjectId, ref: 'story' }],
  donations: [{ type: Schema.ObjectId, ref: 'donation' }],
  faqs: [{ type: Schema.ObjectId, ref: 'faq' }],
  hiwcard: [{ type: Schema.ObjectId, ref: 'hiwcard' }]
});

const Site = mongoose.model("site", siteSchema);

module.exports = Site;
