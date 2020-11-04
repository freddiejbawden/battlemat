const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
    colors: {
      'ui-background': '#eee'
    }
  },
  tab: {
    background: '#ccc',
    color: 'dark',
    active: {
      background: '#0000ff'
    },
    margin: {
      horizontal: '5px',
      vertical: '-2px'
    },
    border: undefined,
    pad: 'small',
    extend: {
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px'
    }
  },
  box: {
    background: 'ui-background'
  }
};

export default theme;