
// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys( obj ).length === 0;

// ** Returns K format from a number
export const kFormatter = num => ( num > 999 ? `${( num / 1000 ).toFixed( 1 )}k` : num );

// ** Converts HTML to string
export const htmlToString = html => html.replace( /<\/?[^>]+(>|$)/g, '' );

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = ( value, formatting = { month: 'short', day: 'numeric', year: 'numeric' } ) => {
  if ( !value ) return value;
  return new Intl.DateTimeFormat( 'en-US', formatting ).format( new Date( value ) );
};

// ** Returns short month of passed date
export const formatDateToMonthShort = ( value, toTimeForCurrentDay = true ) => {
  const date = new Date( value );
  let formatting = { month: 'short', day: 'numeric' };

  if ( toTimeForCurrentDay && isToday( date ) ) {
    formatting = { hour: 'numeric', minute: 'numeric' };
  }

  return new Intl.DateTimeFormat( 'en-US', formatting ).format( new Date( value ) );
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem( 'userData' );
export const getUserData = () => JSON.parse( localStorage.getItem( 'userData' ) );

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if ( userRole === 'admin' ) return '/';
  if ( userRole === 'client' ) return '/access-control';
  return '/login';
};

//** Random Id Generator */

export const randomIdGenerator = () => {
  const id = Math.floor( Math.random() * Date.now() );
  return id;
};

//** Random Id Generator: String */

export const randomIdString = () => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < 4; i++ ) {
    result += `set-${characters.charAt( Math.floor( Math.random() *
      charactersLength ) )}`;
  }
  return result;
};

//** Random Id Generator: Field */

export const randomFieldId = () => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < 2; i++ ) {
    result += `fid-${characters.charAt( Math.floor( Math.random() *
      charactersLength ) )}`;
  }
  return result;
};

/// Convert Query String 
export const convertQueryString = ( params ) => {
  const searchParams = new URLSearchParams( params );
  return searchParams;
};


/// Get ID from URL Path
export const getIdFromUrl = () => {
  const urlSearchParams = new URLSearchParams( window.location );
  const params = Object.fromEntries( urlSearchParams.entries() );

  // const params = useLocation();
  const id = Number( params.pathname.substring( params.pathname.lastIndexOf( '/' ) + 1 ) );
  return id;
};


// Is it Devepment Mode
export const isDevelopmentMode = () => {
  const development = process.env.NODE_ENV === 'development';
  return development;
};
export const isProductionMode = () => {
  const production = process.env.NODE_ENV === 'production';
  return production;
};

export const productionMode = () => {
  if ( process.env.NODE_ENV === 'development' || !process.env.NODE_ENV === 'production' ) {
    return true;
  } else {
    return false;
  }
};
export const createOption = ( label, Id ) => ( {
  label,
  value: Id
} );

///FOr Formating JSON Data
export const showJsonHtml = ( tagId, data ) => {
  const element = document.querySelector( `#${tagId}` );
  if ( element ) {
    element.textContent = JSON.stringify( data, null, 2 );
  }
  //  const getJSON = document.getElementById( `${tagId}` ).textContent = JSON.stringify( data, null, 2 );
  return element;
};


// ** React Select Theme Colors
export const selectThemeColors = theme => ( {
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
} );

