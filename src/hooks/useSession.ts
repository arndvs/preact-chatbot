import { useCookies } from 'react-cookie';

const COOKIE_DELIMITER = '::';

const getCookieName = (islandType: string) => `chatbot-${islandType}`;

interface SessionData {
  storeId: string | undefined;
  sessionId: string | undefined;
  customerStoreId: string | undefined;
}

export const useSession = (islandType: string) => {
  const cookieName = getCookieName(islandType);
  const [cookies, setCookieFn, removeCookieFn] = useCookies([cookieName]);

  const parseSession = (): SessionData => {
    const raw = cookies[cookieName];
    if (!raw) return { storeId: undefined, sessionId: undefined, customerStoreId: undefined };
    const parts = raw.split(COOKIE_DELIMITER);
    return {
      storeId: parts[0],
      sessionId: parts[1],
      customerStoreId: parts[2]
    };
  };

  const session = parseSession();

  const setSession = (storeId: string, sessionId: string, customerStoreId: string) => {
    const domain = window.location.hostname;
    setCookieFn(
      cookieName,
      `${storeId}${COOKIE_DELIMITER}${sessionId}${COOKIE_DELIMITER}${customerStoreId}`,
      { path: '/', domain }
    );
  };

  const clearSession = () => {
    removeCookieFn(cookieName, { path: '/' });
  };

  return { session, setSession, clearSession, cookieName };
};
