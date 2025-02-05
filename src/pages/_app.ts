import type { App } from 'vue';
import { Avatar, Button, Card, Link, ThemeProvide, User } from '@fect-ui/vue';

export default (app: App) => {
  [Avatar, Button, Card, Link, ThemeProvide, User]
    .forEach(component => app.use(component));
};
