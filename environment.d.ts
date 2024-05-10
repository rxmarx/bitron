declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENTID: string;
      PREFIX: string;
      OWNERID: string;
      COOWNERID: string;
      DEVGUILDID: string;
      DEVCHANNELID: string;
      ERRORCHANNELID: string;
      BUGREPORTCHANNELID: string;
      FEATUREREQUESTCHANNELID: string;
      GIPHYAPIKEY: string;
      DATABASE_URL: string;
      BOTINVITEURL: string;
      BOTPROFILE: string;
      OPENAI_ORG: string;
      OPENAI_KEY: string;
      CACHE_URL: string;
      CACHE_TOKEN: string;
      SERVER_API: string;
      SERVER_URL: string;
    }
  }
}

export {};
