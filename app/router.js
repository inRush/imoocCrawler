'use strict';

module.exports = app => {
  const admin = app.role.can('admin');

  app.get('/', 'home.index');
  app.get('/search', 'home.search');

  app.get('/rollcall',admin, 'rollcall.index');
  app.post('/rollcall/answer', admin,'rollcall.answer');

  app.get('/login', 'user.login');
  app.post('/login','user.authorization');
  app.get('/logout', 'user.logout');

};