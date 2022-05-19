import "./boot.js";
import getNodeEnv from "./config/getNodeEnv.js";
import getDatabaseUrl from "./config/getDatabaseUrl.cjs";

export default {
  nodeEnv: getNodeEnv(),
  awsAccess: { key: process.env.AWS_ACCESS_KEY_ID },
  awsSecret: { key: process.env.AWS_SECRET_ACCESS_KEY },
  s3Bucket: { name: process.env.S3_BUCKET_DEVELOPMENT },
  session: { secret: process.env.SESSION_SECRET },
  databaseUrl: getDatabaseUrl(getNodeEnv()),
  web: { host: process.env.HOST || "0.0.0.0", port: process.env.PORT || 3000 }
};
