describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);

      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.ok(user.hasOwnProperty('name'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {

    const usersWithStats = fixtures.users;

    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const userName = usersWithStats.sort((primerD, segundoD) => {
        if (primerD.name > segundoD.name) {
          return 1;
        } else if (primerD.name < segundoD.name) {
          return -1;
        }
        return 0;
      })
      const processed = sortUsers(usersWithStats, "name", "Ascendente");
      assert.deepEqual(userName, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      const userName = usersWithStats.sort((primerD, segundoD) => {
        if (primerD.name < segundoD.name) {
          return 1;
        } else if (primerD.name > segundoD.name) {
          return -1;
        }
        return 0;
      })
      const processed = sortUsers(usersWithStats, "name", "Descendente");
      assert.deepEqual(userName, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      const userCompletitud = usersWithStats.sort((primerD, segundoD) => {
        return (primerD.stats.percent - segundoD.stats.percent);
      })
      const processed = sortUsers(usersWithStats, "completitud", "Ascendente");
      assert.deepEqual(userCompletitud, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      const userCompletitud = usersWithStats.sort((primerD, segundoD) => {
        return (segundoD.stats.percent - primerD.stats.percent);
      })
      const processed = sortUsers(usersWithStats, "completitud", "Descendente");
      assert.deepEqual(userCompletitud, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      const userExercisesTotal = usersWithStats.sort((primerD, segundoD) => {
        return (primerD.stats.exercises.completed - segundoD.stats.exercises.completed);
      })
      const processed = sortUsers(usersWithStats, "completitud", "Ascendente");
      assert.deepEqual(userExercisesTotal, processed);

    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      const userExercisesTotal = usersWithStats.sort((primerD, segundoD) => {
        return (segundoD.stats.exercises.completed - primerD.stats.exercises.completed);
      })
      const processed = sortUsers(usersWithStats, "completitud", "Descendente");
      assert.deepEqual(userExercisesTotal, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {
      const userQuizzesTotal = usersWithStats.sort((primerD, segundoD) => {
        return (primerD.stats.quizzes.completed - segundoD.stats.quizzes.completed);
      })
      const processed = sortUsers(usersWithStats, "quizzes", "Ascendente");
      assert.deepEqual(userQuizzesTotal, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC',()=>{
      const userQuizzesTotal = usersWithStats.sort((primerD, segundoD) => {
        return (segundoD.stats.quizzes.completed - primerD.stats.quizzes.completed);
      })
      const processed = sortUsers(usersWithStats, "quizzes", "Descendente");
      assert.deepEqual(userQuizzesTotal, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC',()=>{
      const userQuizzespROMEDIO = usersWithStats.sort((primerD, segundoD) => {
        return (primerD.stats.quizzes.scoreAvg - segundoD.stats.quizzes.scoreAvg);
      })
      const processed = sortUsers(usersWithStats, "quizzesScore", "Ascendente");
      assert.deepEqual(userQuizzespROMEDIO, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC',()=>{
      const userQuizzespROMEDIO = usersWithStats.sort((primerD, segundoD) => {
        return (segundoD.stats.quizzes.scoreAvg - primerD.stats.quizzes.scoreAvg);
      })
      const processed = sortUsers(usersWithStats, "quizzesScore", "Descendente");
      assert.deepEqual(userQuizzespROMEDIO, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC',()=>{
      const userReadTotal = usersWithStats.sort((primerD, segundoD) => {
        return (primerD.stats.reads.completed - segundoD.stats.reads.completed);
      })
      const processed = sortUsers(usersWithStats, "quizzesScore", "Ascendente");
      assert.deepEqual(userReadTotal, processed);
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC',()=>{
      const userReadTotal = usersWithStats.sort((primerD, segundoD) => {
        return (segundoD.stats.reads.completed - primerD.stats.reads.completed);
      })
      const processed = sortUsers(usersWithStats, "quizzesScore", "Descendente");
      assert.deepEqual(userReadTotal, processed);
    });

  });

  describe('filterUsers(users, filterBy)', () => {
    const usersWithStats = fixtures.users;

    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)',()=>{
      assert.deepEqual(filterUsers(usersWithStats,"vanessa"),"11")
    });

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {

    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter');

  });

});
