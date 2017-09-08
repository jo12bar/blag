const format = s => (
  s.replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
);

export default (state = 'RFR Demo', action = {}) => {
  switch (action.type) {
    case 'HOME': return 'RFR Demo';
    case 'LIST': return `RFR: ${format(action.payload.category)}`;
    case 'VIDEO': return `RFR: ${format(action.payload.slug)}`;
    case 'LOGIN': return 'RFR Login';
    case 'ADMIN': return 'RFR Admin';
    default: return state;
  }
};

// RFR automatically changes the document.title for you :)
