import app from './app';
import { PORT, APP_URL } from './config/env';

app.listen(PORT, () => {
  console.log(`Server running on ${APP_URL}`);
});
