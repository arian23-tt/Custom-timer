const mysql = require("mysql");
const { hashPassword } = require('../utils');


class DatabaseTimer {


    async GetTimers(token_user){
      const promise = this.getIdUserByToken(token_user);
      const id_user = await promise;
        return new Promise ((resolve,reject)=>
        {
            const connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                database: "timer",
                password: ""
            });
            connection.connect((err) => 
            {
                if (err) {
                  console.log(err);
                } else 
                {
                  console.log('Database - OK');
                  connection.query('SELECT id_timer,timer_name, timer_runnig_time,(SELECT if(SUM(IF(StopTime IS NOT Null, StopTime - StartTime, CURRENT_TIMESTAMP)) > timer.timer_runnig_time, "Закончен",IF(SUM(IF (StopTime IS NULL, 1 , 0)) > 0, "Таймер Идет","Пауза" )) AS STATUS FROM timer.Interval_Timer Where id_timer = timer.id_timer) AS Status From Timer Where id_user = ?',
                 

                  [
                    id_user,
                  ],
                  (err,results,fields) =>
                  {
                
                     
            
                      connection.end((err) => 
                      {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log('Database - Close');
                        //    console.log(results);
                            resolve(results);
                          }
                      });    
                   });
                }
              })
            });
        }

        async CreateTimer(timer_name, timer_runnig_time, token_user){
       //   console.log(token_user);
          const promise = this.getIdUserByToken(token_user);
          const idUser = await promise;
            return new Promise ((resolve, reject) => {
                const connection = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    database: "timer",
                    password: ""
                });
                connection.connect((err) => {
                    if (err) {
                      reject(err);
                    } else {
                      console.log('Database - OK ');
                      connection.query(
                        'INSERT INTO timer.Timer SET ?',
                        {
                          id_user:idUser,
                          timer_name: timer_name,
                          timer_runnig_time: timer_runnig_time,
                        },
                        (err, results, fields) => {
                          if (err) {
                            reject(err);
                          } else {
                            const id_timer = results.insertId;
                            connection.query(
                            'INSERT INTO timer.Interval_Timer SET  ?',
                            {
                              id_timer:id_timer,
                            },
                            (err, results, fields) => {
                            if (err) {
                              reject(err);
                            } else {
                              resolve(id_timer);
                            }
                            connection.end((err) => {
                              if (err) {
                                console.log(err);
                              } else {
                                console.log('Database - Close');
                              }
                            });
                          })}
                  
                       });
                    }
                  })
                });
            }

            async CreateUser(FirstName, LastName, Login, Password){
              return new Promise ((resolve, reject) => {
                const errors = {
                  firstName: '',
                  lastName: '',
                  login: '',
                  password: ''
                };
          
                let hasErrors = false;
          
                if (FirstName === '') {
                  errors.firstName = 'Пустое поле Имя';
                  hasErrors = true;
                }
          
                if (LastName === '') {
                  errors.lastName = 'Пустое поле Фамилия';
                  hasErrors = true;
                }
          
                if (Login === '') {
                  errors.login = 'Пустое поле Логин';
                  hasErrors = true;
                }
          
                if (Password === '') {
                  errors.password = 'Пустое поле Пароль';
                  hasErrors = true;
                }
          
                if (hasErrors) {
                  reject(errors);
                } else {
                  const connection = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    database: "timer",
                    password: ""
                });
                connection.connect((err) => {
                    if (err) {
                      reject(err);
                    } else {
                      console.log('Database - OK ');
                      connection.query(
                        'INSERT INTO timer.User SET ?',
                        {
                          FirstName: FirstName,
                          LastName: LastName,
                          Login: Login,
                          Password: hashPassword(Password)
                        },
                        (err, results, fields) => {
                          if (err) {
                            reject(err);
                            console.log(err);
                          } else {
                            resolve(results);
                          }
                          connection.end((err) => {
                            if (err) {
                              console.log(err);
                            } else {
                              console.log('Database - Close');
                            }
                          });    
                       });
                    }
                  })
                }
                });
              }

              async LoginUser(Login, Password){
                return new Promise ((resolve, reject) => {
                    const connection = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        database: "timer",
                        password: ""
                    });
                    connection.connect((err) => {
                        if (err) {
                          reject(err);
                        } else {
                          console.log('Database - OK ');
                          connection.query(
                            'SELECT id_user FROM timer.User WHERE Login = ? and Password = ?',
                            [
                              Login,
                              hashPassword(Password)
                            ],
                            (err, results, fields) => {
                              if (err) {
                                reject(err);
                              } else if (results.length === 0) {
                                reject(err);
                              } else {
                                //генепрация токена
                                //запись токена
                                const generate_token = (length) => {
                                  const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
                                  const b = [];
                                  for (let i = 0; i < length; i += 1) {
                                    let j = (Math.floor(Math.random() * (a.length - 1)));
                                    b.push(a[j]);
                                  }
                                  return b.join('');
                                };
                                const token_user = generate_token(32);
                                const id_user = results[0].id_user;
                                console.log(id_user);
                                connection.query(
                                     'UPDATE timer.User SET token_user = ? WHERE id_user = ?',
                                     [
                                       token_user,
                                       id_user
                                     ],
                                     (err,results,fields) =>{
                                       if (err){
                                         reject(err);
                                       } else {
                                         resolve(token_user);
                                       }
                                       connection.end((err) => {
                                        if (err) {
                                          console.log(err);
                                        } else {
                                          console.log('Database - Close');
                                        }
                                      });    
                                     }
                                   )
                                  }
                                });
                              }    
                           });
                        })
                      }

                async getIdUserByToken (token_user){
                  console.log(token_user);
                  return new Promise ((resolve, reject) => {
                  const connection = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    database: "timer",
                    password: ""
                });
                          connection.query(
                            'SELECT id_user FROM timer.User WHERE token_user = ?',
                            [
                              token_user,
                            ],
                            (err, results, fields) => {
                              if (err) {
                                reject(err);
                              } else {
                                resolve(results[0].id_user);
                              }
                           });
                        }
                  )}
       
                  async ResumeTime(id_timer,token_user){
                    const promise = this.getIdUserByToken(token_user);
                      const id_user = await promise;
                    return new Promise ((resolve, reject) => {
                        const connection = mysql.createConnection({
                            host: "localhost",
                            user: "root",
                            database: "timer",
                            password: ""
                        });
                        connection.connect((err) => {
                            if (err) {
                              reject(err);
                            } else {
                              console.log('Database - OK ');
                              connection.query(
                                'Insert INTO timer.Interval_Timer SET id_timer = ?  ',
                                [id_timer,token_user],
                                (err, results, fields) => {
                                  if (err) {
                                    reject(err);
                                  } else {
                                    resolve(results);
                                  }
                                  connection.end((err) => {
                                    if (err) {
                                      console.log(err);
                                    } else {
                                      console.log('Database - Close');
                                    }
                                  });    
                               });
                            }
                          })
                        });
                    }

                async PauseTime(id_timer,token_user){
                  console.log(token_user);
                  const promise = this.getIdUserByToken(token_user);
                    const id_user = await promise;
                  return new Promise ((resolve, reject) => {
                      const connection = mysql.createConnection({
                          host: "localhost",
                          user: "root",
                          database: "timer",
                          password: ""
                      });
                      
                      connection.connect((err) => {
                          if (err) {
                            reject(err);
                          } else {
                            console.log('Database - OK ');
                            connection.query(
                              'UPDATE timer.Interval_Timer SET StopTime = NOW() WHERE StopTime is NULL AND id_timer = ?',
                              //updtae timer.Interval_Timer StopTime Now 
                              [id_timer,token_user],
                              (err, results, fields) => {
                                if (err) {
                                  reject(err);
                                } else {
                                  resolve(results);
                                }
                                connection.end((err) => {
                                  if (err) {
                                    console.log(err);
                                  } else {
                                    console.log('Database - Close');
                                  }
                                });    
                             });
                          }
                        })
                      });
                  }

  
                async logout(token_user){
                  const promise = this.getIdUserByToken(token_user);
                  const id_user = await promise;
                  return new Promise ((resolve, reject) => {
                    const connection = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        database: "timer",
                        password: ""
                    });
                    connection.connect((err) => {
                        if (err) {
                          reject(err);
                        } else {
                      
                          console.log('Database - OK ');
                          console.log(token_user);
                          
                          connection.query(
                            'UPDATE timer.User SET token_user = NULL WHERE id_user = ?' ,
                            [
                              id_user
                            ],
                            (err, results, fields) => {
                              if (err) {
                                reject(err);
                              } else {
                                resolve(results);
                              }
                              connection.end((err) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  console.log('Database - Close');
                                }
                              });    
                           });
                        }
                      })
                    });
                }
  }
  
  module.exports = {
    DatabaseTimer,
  };