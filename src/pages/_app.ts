import type { App } from 'vue';
import { Avatar, Button, Card, Grid, GridGroup, Link, ThemeProvide, User } from '@fect-ui/vue';

export default (app: App) => {
  [Avatar, Button, Card, Grid, GridGroup, Link, ThemeProvide, User]
    .forEach(component => app.use(component));
};
