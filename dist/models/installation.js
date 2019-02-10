"use strict";

var Archetype = require('archetype-js');

module.exports = new Archetype({
  action: {
    $type: 'string',
    $required: true
  },
  installation: {
    id: {
      $type: 'number'
    },
    account: {
      login: {
        $type: 'string'
      },
      id: {
        $type: 'number'
      },
      node_id: {
        $type: 'string'
      },
      avatar_url: {
        $type: 'string'
      },
      gravatar_id: {
        $type: 'string'
      },
      url: {
        $type: 'string'
      },
      html_url: {
        $type: 'string'
      },
      followers_url: {
        $type: 'string'
      },
      following_url: {
        $type: 'string'
      },
      gists_url: {
        $type: 'string'
      },
      starred_url: {
        $type: 'string'
      },
      subscriptions_url: {
        $type: 'string'
      },
      organizations_url: {
        $type: 'string'
      },
      repos_url: {
        $type: 'string'
      },
      events_url: {
        $type: 'string'
      },
      received_events_url: {
        $type: 'string'
      },
      type: {
        $type: 'string'
      },
      site_admin: {
        $type: 'boolean'
      },
      $required: true
    },
    repository_selection: {
      $type: 'string'
    },
    access_tokens_url: {
      $type: 'string'
    },
    repositories_url: {
      $type: 'string'
    },
    html_url: {
      $type: 'string'
    },
    app_id: {
      $type: 'number'
    },
    target_id: {
      $type: 'number'
    },
    target_type: {
      $type: 'string'
    },
    permissions: {
      metadata: {
        $type: 'string'
      },
      contents: {
        $type: 'string'
      },
      issues: {
        $type: 'string'
      }
    },
    events: {
      $type: ['string'],
      $default: []
    },
    created_at: {
      $type: 'string'
    },
    updated_at: {
      $type: 'string'
    },
    single_file_name: {
      $type: 'string'
    },
    $required: true
  },
  repositories: {
    $type: [{
      id: {
        $type: 'number'
      },
      name: {
        $type: 'string'
      },
      full_name: {
        $type: 'string'
      },
      private: {
        $type: 'boolean'
      }
    }]
  },
  sender: {
    login: {
      $type: 'string'
    },
    id: {
      $type: 'number'
    },
    node_id: {
      $type: 'string'
    },
    avatar_url: {
      $type: 'string'
    },
    gravatar_id: {
      $type: 'string'
    },
    url: {
      $type: 'string'
    },
    html_url: {
      $type: 'string'
    },
    followers_url: {
      $type: 'string'
    },
    following_url: {
      $type: 'string'
    },
    gists_url: {
      $type: 'string'
    },
    starred_url: {
      $type: 'string'
    },
    subscriptions_url: {
      $type: 'string'
    },
    organizations_url: {
      $type: 'string'
    },
    repos_url: {
      $type: 'string'
    },
    events_url: {
      $type: 'string'
    },
    received_events_url: {
      $type: 'string'
    },
    type: {
      $type: 'string'
    },
    site_admin: {
      $type: 'boolean'
    },
    $required: true
  }
}).compile('InstallationType');