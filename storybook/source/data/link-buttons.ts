const linkButtons = {
  'Light': {
    'Default': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': 'rgba(0, 0, 0, 0.80)',
        'fontSize': 11,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.22,
        'wordWrap': 'break-word'
      },
      'underlineColor': 'rgba(0, 0, 0, 0.8)'
    },
    'Hover': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': 'rgba(0, 0, 0, 0.60)',
        'fontSize': 11,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.22,
        'wordWrap': 'break-word'
      },
      'underlineColor': 'rgba(0, 0, 0, 0.6)'
    }
  },
  'Light Classic': {
    'Default': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': '#444444',
        'fontSize': 11,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.22,
        'wordWrap': 'break-word'
      },
      'underlineColor': '#444444'
    },
    'Hover': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': '#A5A5A5',
        'fontSize': 11,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.22,
        'wordWrap': 'break-word'
      },
      'underlineColor': '#A5A5A5'
    }
  },
  'Dark': {
    'Default': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': 'rgba(255, 255, 255, 0.80)',
        'fontSize': 11,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.22,
        'wordWrap': 'break-word'
      },
      'underlineColor': 'rgba(255, 255, 255, 0.8)'
    },
    'Hover': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': 'rgba(255, 255, 255, 0.60)',
        'fontSize': 11,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.22,
        'wordWrap': 'break-word'
      },
      'underlineColor': 'rgba(255, 255, 255, 0.6)'
    }
  },
  'Dark Contrast': {
    'Default': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': '#E8E8E8',
        'fontSize': 11,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.22,
        'wordWrap': 'break-word'
      },
      'underlineColor': '#E8E8E8'
    },
    'Hover': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': '#B8B8B8',
        'fontSize': 11,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.22,
        'wordWrap': 'break-word'
      },
      'underlineColor': '#B8B8B8'
    }
  },
  'Modern Light': {
    'Default': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': '#383838',
        'fontSize': 12,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.24,
        'wordWrap': 'break-word'
      },
      'underlineColor': '#383838'
    },
    'Hover': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': 'rgba(0, 0, 0, 0.60)',
        'fontSize': 12,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.24,
        'wordWrap': 'break-word'
      },
      'underlineColor': 'rgba(0, 0, 0, 0.6)'
    }
  },
  'Modern Dark': {
    'Default': {
      'container': {
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'flex-start',
        'display': 'inline-flex'
      },
      'text': {
        'textAlign': 'center',
        'justifyContent': 'center',
        'display': 'flex',
        'flexDirection': 'column',
        'color': '#F3F3F3',
        'fontSize': 12,
        'fontFamily': 'Arial',
        'fontWeight': '400',
        'lineHeight': 16,
        'letterSpacing': 0.24,
        'wordWrap': 'break-word'
      },
      'underlineColor': '#F3F3F3'
    }
  }
} as const;

export default linkButtons;
