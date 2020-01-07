const project = 'ABA_2017_18'

const tcpStringsList = {
  project,

  matchID: {
    in : () => [
      "0 RENDERER SET_OBJECT SCENE*" + project + "/PLAYOUT/uvod\0",
      "0 "+'RENDERER*STAGE*DIRECTOR*$uvod_in START'+'\0',
    ],
    main: (round, teamTitleA, teamTitleB, logoA, logoB, lokacija) => [
      "0 "+'RENDERER*TREE*$flag_uvod_ekipa_1*IMAGE SET IMAGE*' + project + '/FLAGS/'+logoA+'\0',
      "0 "+'RENDERER*TREE*$flag_uvod_ekipa_2*IMAGE SET IMAGE*' + project + '/FLAGS/'+logoB+'\0',
      "0 "+'RENDERER*TREE*$ekipa_uvod_levo*GEOM*TEXT SET '+ teamTitleA +'\0',
      "0 "+'RENDERER*TREE*$ekipa_uvod_desno*GEOM*TEXT SET '+ teamTitleB+'\0',
      "0 "+'RENDERER*TREE*$runda*GEOM*TEXT SET '+ round +'\0',
      "0 "+'RENDERER*TREE*$lokacija*GEOM*TEXT SET '+lokacija+'\0',
    ],
    out : () => "0 "+'RENDERER*STAGE*DIRECTOR*$uvod_out START'+'\0'
  },


  pari :{
    in : (info) => {
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/pari'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$pari_in START'+'\0', //start animacije
        "0 "+'RENDERER*TREE*$Fixtures*GEOM*TEXT SET '+ info +'\0',
      ]
    },
    main : (no, par, datum, i) => {
      return [ //to loopaj v programu
          "0 "+'RENDERER*TREE*$' + i + '*GEOM*TEXT SET '+ no +'\0',
          "0 "+'RENDERER*TREE*$par' + i + '*GEOM*TEXT SET '+ par +'\0',
          "0 "+'RENDERER*TREE*$Datum_'+ i + '*GEOM*TEXT SET '+ datum +'\0',
      ]
    },
    out : () => {
      return  "0 "+'RENDERER*STAGE*DIRECTOR*$pari_out START'+'\0'
    },

  },

  lestvica: {
    lestvica_in : (info) => {
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/lestvica'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$lestvica_in START'+'\0', //start animacije
        "0 "+'RENDERER*TREE*$Fixtures*GEOM*TEXT SET '+ info +'\0',
      ]
    },
    lestvica : (i,  ekipa, gp, wins, loses, diff, points) => {
      return [ //to loopaj v programu
          "0 "+'RENDERER*TREE*$m' + i + '*GEOM*TEXT SET '+ i +'\0',
          "0 "+'RENDERER*TREE*$ekipa_lestvica' + i + '*GEOM*TEXT SET '+ ekipa +'\0',
          "0 "+'RENDERER*TREE*$p'+ i + '*GEOM*TEXT SET '+ gp +'\0',
          "0 "+'RENDERER*TREE*$w'+ i + '*GEOM*TEXT SET '+ wins +'\0',
          "0 "+'RENDERER*TREE*$l'+ i + '*GEOM*TEXT SET '+ loses +'\0',
          "0 "+'RENDERER*TREE*$d'+ i + '*GEOM*TEXT SET '+ diff +'\0',
          "0 "+'RENDERER*TREE*$pike'+ i + '*GEOM*TEXT SET '+ points +'\0',
      ]
    },
    lestvica_out : () => {
      return "0 "+'RENDERER*STAGE*DIRECTOR*$lestvica_out START'+'\0'
    }
  },

  postava : {
    in : (team, coach) => {
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/postava'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$postava_in START'+'\0', //start animacije
        "0 "+'RENDERER*TREE*$ekipa_postava*GEOM*TEXT SET '+ team +'\0',
        "0 "+'RENDERER*TREE*$ime_trenerja*GEOM*TEXT SET '+ coach +'\0',
      ]
    },
    main : (i, playerNo, playerName, height, age, position) => {
      return [ //to loopaj v programu
          "0 "+'RENDERER*TREE*$st' + i + '*GEOM*TEXT SET '+ playerNo +'\0',
          "0 "+'RENDERER*TREE*$ime_postava' + i + '*GEOM*TEXT SET '+ playerName +'\0',
          "0 "+'RENDERER*TREE*$cm'+ i + '*GEOM*TEXT SET '+ height +'\0',
          "0 "+'RENDERER*TREE*$a'+ i + '*GEOM*TEXT SET '+ age +'\0',
          "0 "+'RENDERER*TREE*$p'+ i + '*GEOM*TEXT SET '+ position +'\0',
      ]
    },
    out : () => {
      return  "0 "+'RENDERER*STAGE*DIRECTOR*$postava_out START'+'\0'
    },
  },

  bigStats: {
    in : (project, info, teamA, teamB) => {
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/statistika_1'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$statistika_in START'+'\0', //start animacije
        "0 "+'RENDERER*TREE*$naslov*GEOM*TEXT SET '+ info +'\0',
        "0 "+'RENDERER*TREE*$ekipa_stat_levo*GEOM*TEXT SET '+ teamA +'\0',
        "0 "+'RENDERER*TREE*$ekipa_stat_desno*GEOM*TEXT SET '+ teamB +'\0',
      ]
    },
    main : (side, points, freeThrows, pts2, pts3, FG, rebounds, assists, fouls) => { /*side je lahko 'L', 'D'*/
      return [ //to loopaj v programu
          "0 "+'RENDERER*TREE*$' + side + '1*GEOM*TEXT SET '+ points +'\0',
          "0 "+'RENDERER*TREE*$' + side + '2*GEOM*TEXT SET '+ freeThrows +'\0',
          "0 "+'RENDERER*TREE*$' + side + '3*GEOM*TEXT SET '+ pts2 +'\0',
          "0 "+'RENDERER*TREE*$' + side + '4*GEOM*TEXT SET '+ pts3 +'\0',
          "0 "+'RENDERER*TREE*$' + side + '5*GEOM*TEXT SET '+ FG +'\0',
          "0 "+'RENDERER*TREE*$' + side + '6*GEOM*TEXT SET '+ rebounds +'\0',
          "0 "+'RENDERER*TREE*$' + side + '7*GEOM*TEXT SET '+ assists +'\0',
          "0 "+'RENDERER*TREE*$' + side + '8*GEOM*TEXT SET '+ fouls +'\0',
      ]
    },
    out : () => {
      return  "0 "+'RENDERER*STAGE*DIRECTOR*$statistika_out START'+'\0'
    },
  },

  referees: {
    in : (project) => {
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/sodniki'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$sodniki_in START'+'\0', //start animacije
      ]
    },
    main : (sodnik1, sodnik2, sodnik3) => { /*side je lahko 'L', 'D'*/
      return [ //to loopaj v programu
          "0 "+'RENDERER*TREE*$sodnik1*GEOM*TEXT SET '+ sodnik1 +'\0',
          "0 "+'RENDERER*TREE*$sodnik2*GEOM*TEXT SET '+ sodnik2 +'\0',
          "0 "+'RENDERER*TREE*$sodnik3*GEOM*TEXT SET '+ sodnik3 +'\0',
      ]
    },
    out : () => {
      return   "0 "+'RENDERER*STAGE*DIRECTOR*$sodniki_out START'+'\0'
    },
  },
  gameLeaders : {
    in : (info, teamA, teamB) => { //top scorers, top fouls
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/game_leaders'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$game_leaders_in START' +'\0',
        "0 "+'RENDERER*TREE*$ekipa_stat_levo*GEOM*TEXT SET '+ teamA +'\0',
        "0 "+'RENDERER*TREE*$ekipa_stat_desno*GEOM*TEXT SET '+ teamB +'\0',
      ]
    },
    main : (gameLeadersA, gameLeadersB) => { /*side je lahka 'l', 'd'*/
      return [ //to loopaj v programu
        `0 RENDERER*TREE*$ime_L1*GEOM*TEXT SET ${gameLeadersA[0].name}\0`,
        `0 RENDERER*TREE*$score_L1*GEOM*TEXT SET ${gameLeadersA[0].score}\0`,
        `0 RENDERER*TREE*$ime_L2*GEOM*TEXT SET ${gameLeadersA[1].name}\0`,
        `0 RENDERER*TREE*$score_L2*GEOM*TEXT SET ${gameLeadersA[1].score}\0`,
        `0 RENDERER*TREE*$ime_L3*GEOM*TEXT SET ${gameLeadersA[2].name}\0`,
        `0 RENDERER*TREE*$score_L3*GEOM*TEXT SET ${gameLeadersA[2].score}\0`,
        `0 RENDERER*TREE*$ime_L4*GEOM*TEXT SET ${gameLeadersA[3].name}\0`,
        `0 RENDERER*TREE*$score_L4*GEOM*TEXT SET ${gameLeadersA[3].score}\0`,
        `0 RENDERER*TREE*$ime_L5*GEOM*TEXT SET ${gameLeadersA[4].name}\0`,
        `0 RENDERER*TREE*$score_L5*GEOM*TEXT SET ${gameLeadersA[4].score}\0`,

        `0 RENDERER*TREE*$ime_D1*GEOM*TEXT SET ${gameLeadersB[0].name}\0`,
        `0 RENDERER*TREE*$score_D1*GEOM*TEXT SET ${gameLeadersB[0].score}\0`,
        `0 RENDERER*TREE*$ime_D2*GEOM*TEXT SET ${gameLeadersB[1].name}\0`,
        `0 RENDERER*TREE*$score_D2*GEOM*TEXT SET ${gameLeadersB[1].score}\0`,
        `0 RENDERER*TREE*$ime_D3*GEOM*TEXT SET ${gameLeadersB[2].name}\0`,
        `0 RENDERER*TREE*$score_D3*GEOM*TEXT SET ${gameLeadersB[2].score}\0`,
        `0 RENDERER*TREE*$ime_D4*GEOM*TEXT SET ${gameLeadersB[3].name}\0`,
        `0 RENDERER*TREE*$score_D4*GEOM*TEXT SET ${gameLeadersB[3].score}\0`,
        `0 RENDERER*TREE*$ime_D5*GEOM*TEXT SET ${gameLeadersB[4].name}\0`,
        `0 RENDERER*TREE*$score_D5*GEOM*TEXT SET ${gameLeadersB[4].score}\0`,
      ]
    },
    out : () => {
      return  "0 "+'RENDERER*STAGE*DIRECTOR*$game_leaders_out START'+'\0' //start animacije
    },
  },
  topScorers : {
    in : (teamA, teamB) => { //top scorers, top fouls
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/top_scorers_fouls'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$top_in START' +'\0',
        "0 "+'RENDERER*TREE*$ekipa_top_levo*GEOM*TEXT SET '+ teamA +'\0',
        "0 "+'RENDERER*TREE*$ekipa_top_desno*GEOM*TEXT SET '+ teamB +'\0',
        "0 "+'RENDERER*TREE*$top_naslov*GEOM*TEXT SET POINT LEADERS\0',
      ]
    },
    main : (topScorersA, topScorersB) => { /*side je lahka 'l', 'd'*/
      return [ //to loopaj v programu
        `0 RENDERER*TREE*$imetop1l*GEOM*TEXT SET ${topScorersA[0].name}\0`,
        `0 RENDERER*TREE*$top1l*GEOM*TEXT SET ${topScorersA[0].score}\0`,
        `0 RENDERER*TREE*$imetop2l*GEOM*TEXT SET ${topScorersA[1].name}\0`,
        `0 RENDERER*TREE*$top2l*GEOM*TEXT SET ${topScorersA[1].score}\0`,
        `0 RENDERER*TREE*$imetop3l*GEOM*TEXT SET ${topScorersA[2].name}\0`,
        `0 RENDERER*TREE*$top3l*GEOM*TEXT SET ${topScorersA[2].score}\0`,
        `0 RENDERER*TREE*$imetop4l*GEOM*TEXT SET ${topScorersA[3].name}\0`,
        `0 RENDERER*TREE*$top4l*GEOM*TEXT SET ${topScorersA[3].score}\0`,
        `0 RENDERER*TREE*$imetop5l*GEOM*TEXT SET ${topScorersA[4].name}\0`,
        `0 RENDERER*TREE*$top5l*GEOM*TEXT SET ${topScorersA[4].score}\0`,

        `0 RENDERER*TREE*$imetop1d*GEOM*TEXT SET ${topScorersB[0].name}\0`,
        `0 RENDERER*TREE*$top1d*GEOM*TEXT SET ${topScorersB[0].score}\0`,
        `0 RENDERER*TREE*$imetop2d*GEOM*TEXT SET ${topScorersB[1].name}\0`,
        `0 RENDERER*TREE*$top2d*GEOM*TEXT SET ${topScorersB[1].score}\0`,
        `0 RENDERER*TREE*$imetop3d*GEOM*TEXT SET ${topScorersB[2].name}\0`,
        `0 RENDERER*TREE*$top3d*GEOM*TEXT SET ${topScorersB[2].score}\0`,
        `0 RENDERER*TREE*$imetop4d*GEOM*TEXT SET ${topScorersB[3].name}\0`,
        `0 RENDERER*TREE*$top4d*GEOM*TEXT SET ${topScorersB[3].score}\0`,
        `0 RENDERER*TREE*$imetop5d*GEOM*TEXT SET ${topScorersB[4].name}\0`,
        `0 RENDERER*TREE*$top5d*GEOM*TEXT SET ${topScorersB[4].score}\0`
      ]},
    out : () => {
      return '0 '+'RENDERER*STAGE*DIRECTOR*$top_out START'+'\0' //start animacije
    },
  },
  malaStat1 : {
    in : (info, teamA, teamB) => { //top scorers, top fouls
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/statistika'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$top_in START'+'\0', //start animacije
        "0 "+'RENDERER*TREE*$naslov*GEOM*TEXT SET '+ info +'\0',
        "0 "+'RENDERER*TREE*$ekipa_top_levo*GEOM*TEXT SET '+ teamA +'\0',
        "0 "+'RENDERER*TREE*$ekipa_top_desno*GEOM*TEXT SET '+ teamB +'\0',
      ]
    },
    main : (side, topPlayer) => { /*side je lahka 'l', 'd'*/
      return [ //to loopaj v programu
          "0 "+'RENDERER*TREE*$top' + side + '1*GEOM*TEXT SET '+ topPlayer[0] +'\0',
          "0 "+'RENDERER*TREE*$top' + side + '2*GEOM*TEXT SET '+ topPlayer[1] +'\0',
          "0 "+'RENDERER*TREE*$top' + side + '3*GEOM*TEXT SET '+ topPlayer[2] +'\0',
          "0 "+'RENDERER*TREE*$top' + side + '4*GEOM*TEXT SET '+ topPlayer[3] +'\0',
          "0 "+'RENDERER*TREE*$top' + side + '5*GEOM*TEXT SET '+ topPlayer[4] +'\0',
      ]
    },
    out : () => {
      return  "0 "+'RENDERER*STAGE*DIRECTOR*$top_out START'+'\0'
      },
  },

  lineup : {
    in : ( team ) => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/postava\0`,
        `0 RENDERER*STAGE*DIRECTOR*$postava_in START\0`,
        `0 RENDERER*TREE*$ekipa_postava*GEOM*TEXT SET ${team}\0`,
    ],
    main : ( data, coach ) => {
      let temp =  data.map((rowData, iter) => {
          if (iter > 0) {
            return `0 RENDERER*TREE*$st${iter}*GEOM*TEXT SET ${rowData[0].value}\0` +
            `0 RENDERER*TREE*$ime_postava${iter}*GEOM*TEXT SET ${rowData[1].value + ' ' + rowData[2].value }\0` +
            `0 RENDERER*TREE*$cm${iter}*GEOM*TEXT SET ${rowData[5].value}\0` +
            `0 RENDERER*TREE*$a${iter}*GEOM*TEXT SET ${rowData[6].value}\0` +
            `0 RENDERER*TREE*$p${iter}*GEOM*TEXT SET ${rowData[8].value}\0` 
            
          } else {
            return `0 RENDERER*TREE*$ime_trenerja*GEOM*TEXT SET ${coach}\0`
          } 
        }
      )
      return temp 
    },
    out : () =>  '0 RENDERER*STAGE*DIRECTOR*$postava_out START\0'
  },

  byPoints : {
    in : (info, teamA, teamB, score) => { //top scorers, top fouls
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/SMALL_STATS'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$SMALL_STATS_IN START'+'\0', //start animacije
        "0 "+'RENDERER*TREE*$ekipa1*GEOM*TEXT SET '+ teamA +'\0',
        "0 "+'RENDERER*TREE*$ekipa2*GEOM*TEXT SET '+ teamB +'\0',
        "0 "+'RENDERER*TREE*$rezultat_ekipa1*GEOM*TEXT SET '+ score.A +'\0',
        "0 "+'RENDERER*TREE*$rezultat_ekipa2*GEOM*TEXT SET '+ score.B +'\0',
      ]
    },
    main : (points, missed) => {
      return [
        "0 "+'RENDERER*TREE*$i1*GEOM*TEXT SET ' + 'FREE THROWS' + '\0',
        "0 "+'RENDERER*TREE*$i2*GEOM*TEXT SET ' + '2 pts.' + '\0',
        "0 "+'RENDERER*TREE*$i3*GEOM*TEXT SET ' + '3 pts.' + '\0',

        "0 "+'RENDERER*TREE*$1_1*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$1_2*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$1_3*GEOM*TEXT SET \0',

        "0 "+'RENDERER*TREE*$2_1*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_2*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_3*GEOM*TEXT SET \0',

        "0 "+'RENDERER*TREE*$1_1_1*GEOM*TEXT SET '+ points[0].A + '/' + (points[0].A + missed[0].A) +'\0',
        "0 "+'RENDERER*TREE*$1_2_1*GEOM*TEXT SET '+ 
        Math.round((points[0].A * 100  / ((points[0].A + missed[0].A) ? (points[0].A + missed[0].A) : 1))) 
        + '%' + '\0',
        "0 "+'RENDERER*TREE*$2_1_1*GEOM*TEXT SET '+ points[0].B + '/' + (points[0].B + missed[0].B) +'\0',
        "0 "+'RENDERER*TREE*$2_2_1*GEOM*TEXT SET '+ 
        Math.round((points[0].B * 100  / ((points[0].B + missed[0].B) ? (points[0].B + missed[0].B) : 1))) 
        + '%' + '\0',

        "0 "+'RENDERER*TREE*$1_1_2*GEOM*TEXT SET '+ points[1].A + '/' + (points[1].A + missed[1].A) +'\0',
        "0 "+'RENDERER*TREE*$1_2_2*GEOM*TEXT SET '+ 
        Math.round((points[1].A * 100  / ((points[1].A + missed[1].A) ? (points[1].A + missed[1].A) : 1))) 
        + '%' + '\0',
        "0 "+'RENDERER*TREE*$2_1_2*GEOM*TEXT SET '+ points[1].B + '/' + (points[1].B + missed[1].B) +'\0',
        "0 "+'RENDERER*TREE*$2_2_2*GEOM*TEXT SET '+ 
        Math.round((points[1].B * 100  / ((points[1].B + missed[1].B) ? (points[1].B + missed[1].B) : 1))) 
        + '%' + '\0',

        "0 "+'RENDERER*TREE*$1_1_3*GEOM*TEXT SET '+ points[2].A + '/' + (points[2].A + missed[2].A) +'\0',
        "0 "+'RENDERER*TREE*$1_2_3*GEOM*TEXT SET '+ 
        Math.round((points[2].A * 100  / ((points[2].A + missed[2].A) ? (points[2].A + missed[2].A) : 1))) 
        + '%' + '\0',
        "0 "+'RENDERER*TREE*$2_1_3*GEOM*TEXT SET '+ points[2].B + '/' + (points[2].B + missed[2].B) +'\0',
        "0 "+'RENDERER*TREE*$2_2_3*GEOM*TEXT SET '+ 
        Math.round((points[2].B * 100  / ((points[2].B + missed[2].B) ? (points[2].B + missed[2].B) : 1))) 
        + '%' + '\0',
      ]
    },
    out : () => `0 RENDERER*STAGE*DIRECTOR*$SMALL_STATS_OUT START\0`, 
  },

  stealLostBalls : {
    in : (info, teamA, teamB, score) => { //top scorers, top fouls
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/SMALL_STATS'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$SMALL_STATS_IN START'+'\0', //start animacije
        "0 "+'RENDERER*TREE*$ekipa1*GEOM*TEXT SET '+ teamA +'\0',
        "0 "+'RENDERER*TREE*$ekipa2*GEOM*TEXT SET '+ teamB +'\0',
        "0 "+'RENDERER*TREE*$rezultat_ekipa1*GEOM*TEXT SET '+ score.A +'\0',
        "0 "+'RENDERER*TREE*$rezultat_ekipa2*GEOM*TEXT SET '+ score.B +'\0',
      ]
    },
    main : (steals, turnovers, assists) => {
      return [
        "0 "+'RENDERER*TREE*$i1*GEOM*TEXT SET ' + 'STEALS' + '\0',
        "0 "+'RENDERER*TREE*$i2*GEOM*TEXT SET ' + 'TURNOVERS' + '\0',
        "0 "+'RENDERER*TREE*$i3*GEOM*TEXT SET ' + 'ASSISTS' + '\0',

        "0 "+'RENDERER*TREE*$1_1*GEOM*TEXT SET '+ steals.A +'\0',
        "0 "+'RENDERER*TREE*$2_1*GEOM*TEXT SET '+ steals.B +'\0',
        "0 "+'RENDERER*TREE*$1_2*GEOM*TEXT SET '+ turnovers.A +'\0',
        "0 "+'RENDERER*TREE*$2_2*GEOM*TEXT SET '+ turnovers.B +'\0',
        "0 "+'RENDERER*TREE*$1_3*GEOM*TEXT SET '+ assists.A + '\0',
        "0 "+'RENDERER*TREE*$2_3*GEOM*TEXT SET '+ assists.B + '\0',

        "0 "+'RENDERER*TREE*$1_1_1*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$1_2_1*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_1_1*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_2_1*GEOM*TEXT SET \0',

        "0 "+'RENDERER*TREE*$1_1_2*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$1_2_2*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_1_2*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_2_2*GEOM*TEXT SET \0',

        "0 "+'RENDERER*TREE*$1_1_3*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$1_2_3*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_1_3*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_2_3*GEOM*TEXT SET \0',
      ]
    },
    out : () => `0 RENDERER*STAGE*DIRECTOR*$SMALL_STATS_OUT START\0`, 
  },
  rebounds : {
    in : (info, teamA, teamB, score) => { //top scorers, top fouls
      return[
        "0 "+'RENDERER SET_OBJECT SCENE*' + project +'/PLAYOUT/SMALL_STATS'+'\0',  //starta sceno -> path 
        "0 "+'RENDERER*STAGE*DIRECTOR*$SMALL_STATS_IN START'+'\0', //start animacije
        "0 "+'RENDERER*TREE*$ekipa1*GEOM*TEXT SET '+ teamA +'\0',
        "0 "+'RENDERER*TREE*$ekipa2*GEOM*TEXT SET '+ teamB +'\0',
        "0 "+'RENDERER*TREE*$rezultat_ekipa1*GEOM*TEXT SET '+ score.A +'\0',
        "0 "+'RENDERER*TREE*$rezultat_ekipa2*GEOM*TEXT SET '+ score.B +'\0',
      ]
    },
    main : (FGs, defRebounds, offRebounds) => {
      return [
        "0 "+'RENDERER*TREE*$i1*GEOM*TEXT SET ' + 'FG%' + '\0',
        "0 "+'RENDERER*TREE*$i2*GEOM*TEXT SET ' + 'DEF REB' + '\0',
        "0 "+'RENDERER*TREE*$i3*GEOM*TEXT SET ' + 'OFF REB' + '\0',

        "0 "+'RENDERER*TREE*$1_1*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$1_2*GEOM*TEXT SET ' + defRebounds.A + '\0',
        "0 "+'RENDERER*TREE*$1_3*GEOM*TEXT SET ' + offRebounds.A + '\0',

        "0 "+'RENDERER*TREE*$2_1*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_2*GEOM*TEXT SET ' + defRebounds.B + '\0',
        "0 "+'RENDERER*TREE*$2_3*GEOM*TEXT SET ' + offRebounds.B + '\0',

        "0 "+'RENDERER*TREE*$1_1_1*GEOM*TEXT SET '+ FGs.A.points + '/' + (FGs.A.points + FGs.A.missed)+'\0',
        "0 "+'RENDERER*TREE*$1_2_1*GEOM*TEXT SET '+ 
         ((FGs.A.points + FGs.A.missed) 
        ? Math.ceil(FGs.A.points / (FGs.A.points + FGs.A.missed) * 100)
        : 0) + 
        '%' + '\0',
        "0 "+'RENDERER*TREE*$2_1_1*GEOM*TEXT SET '+ FGs.B.points + '/' + (FGs.B.points + FGs.B.missed)+'\0',
        "0 "+'RENDERER*TREE*$2_2_1*GEOM*TEXT SET '+ (
          (FGs.B.points + FGs.B.missed)
          ? Math.ceil(FGs.B.points / (FGs.B.points + FGs.B.missed) * 100) 
          : 0
        ) + '%' + '\0',

        "0 "+'RENDERER*TREE*$1_1_2*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$1_2_2*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_1_2*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_2_2*GEOM*TEXT SET \0',

        "0 "+'RENDERER*TREE*$1_1_3*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$1_2_3*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_1_3*GEOM*TEXT SET \0',
        "0 "+'RENDERER*TREE*$2_2_3*GEOM*TEXT SET \0',
      ]
    },
    out : () => `0 RENDERER*STAGE*DIRECTOR*$SMALL_STATS_OUT START\0`, 
  },
  startingPlayers: {
    in : (teamAbr) => {
      return [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/Na_Parketu\0`,  //starta sceno -> path 
        `0 RENDERER*STAGE*DIRECTOR*$Na_Parketu_IN START\0`, //start animacije
        `0 RENDERER*TREE*$ondf_klub*GEOM*TEXT SET ${teamAbr}\0`,
      ]
    },
    main : (topPlayers) => [
      `0 RENDERER*TREE*$ondf1*GEOM*TEXT SET ${topPlayers[0]} - ${topPlayers[1]} - ${topPlayers[2]} - ${topPlayers[3]} - ${topPlayers[4]}\0`
    ],
    out : () => {
      return `0 RENDERER*STAGE*DIRECTOR*$Na_Parketu_OUT START\0` 
    },
  },
  coach : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/podpis_2_line\0`,
        `0 RENDERER*STAGE*DIRECTOR*$podpis_2_line_in START\0`,
    ],
    main : ( teamName, coachName ) => [
        `0 RENDERER*TREE*$vrstica1*GEOM*TEXT SET ${coachName}\0` +
        `0 RENDERER*TREE*$vrstica2*GEOM*TEXT SET ${'HEAD COACH ' + teamName}\0` 
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$podpis_2_line_out START\0',      
  },
  freeThrows : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/Podpis\0`,
        `0 RENDERER*STAGE*DIRECTOR*$podpis_in START\0`,
    ],
    main : ( surname, teamAbr, points, pts1, percent ) => [ //pts1={scored: , all: }
        `0 RENDERER*TREE*$ime*GEOM*TEXT SET ${surname} (${teamAbr})\0` +
        `0 RENDERER*TREE*$points_1*GEOM*TEXT SET ${points}\0` +
        `0 RENDERER*TREE*$points_2*GEOM*TEXT SET 1 Pts: ${pts1.scored}/${pts1.all}\0` +
        `0 RENDERER*TREE*$procenti*GEOM*TEXT SET ${percent}%\0`
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$podpis_out START\0',      
  },
  FGs : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/Podpis\0`,
        `0 RENDERER*STAGE*DIRECTOR*$podpis_in START\0`,
    ],
    main : ( surname, teamAbr, points, fieldGoals, percent ) => [ //pts1={scored: , all: }
        `0 RENDERER*TREE*$ime*GEOM*TEXT SET ${surname} (${teamAbr})\0` +
        `0 RENDERER*TREE*$points_1*GEOM*TEXT SET ${points}\0` +
        `0 RENDERER*TREE*$points_2*GEOM*TEXT SET field goals: ${fieldGoals.scored}/${fieldGoals.all}\0` +
        `0 RENDERER*TREE*$procenti*GEOM*TEXT SET ${percent}%\0`
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$podpis_out START\0',      
  },
  threePoints : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/Podpis\0`,
        `0 RENDERER*STAGE*DIRECTOR*$podpis_in START\0`,
    ],
    main : ( surname, teamAbr, points, pts3, percent ) => [ //pts1={scored: , all: }
        `0 RENDERER*TREE*$ime*GEOM*TEXT SET ${surname} (${teamAbr})\0` +
        `0 RENDERER*TREE*$points_1*GEOM*TEXT SET ${points}\0` +
        `0 RENDERER*TREE*$points_2*GEOM*TEXT SET 1 Pts: ${pts3.scored}/${pts3.all}\0` +
        `0 RENDERER*TREE*$procenti*GEOM*TEXT SET ${percent}%\0`
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$podpis_out START\0',      
  },
  twoPoints : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/Podpis\0`,
        `0 RENDERER*STAGE*DIRECTOR*$podpis_in START\0`,
    ],
    main : ( surname, teamAbr, points, pts2, percent ) => [ //pts1={scored: , all: }
        `0 RENDERER*TREE*$ime*GEOM*TEXT SET ${surname} (${teamAbr})\0` +
        `0 RENDERER*TREE*$points_1*GEOM*TEXT SET ${points}\0` +
        `0 RENDERER*TREE*$points_2*GEOM*TEXT SET 1 Pts: ${pts2.scored}/${pts2.all}\0` +
        `0 RENDERER*TREE*$procenti*GEOM*TEXT SET ${percent}%\0`
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$podpis_out START\0',      
  },
  foulsPodpis : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/Podpis_2\0`,
        `0 RENDERER*STAGE*DIRECTOR*$podpis_2_in START\0`,
    ],
    main : ( surname, teamAbr, fouls ) => [ //pts1={scored: , all: }
        `0 RENDERER*TREE*$ime*GEOM*TEXT SET ${surname} (${teamAbr})\0` +
        `0 RENDERER*TREE*$points_1*GEOM*TEXT SET Fouls: ${fouls}\0`
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$podpis_2_out START\0',      
  },
  reboundsPodpis : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/Podpis_2\0`,
        `0 RENDERER*STAGE*DIRECTOR*$podpis_2_in START\0`,
    ],
    main : ( surname, teamAbr, rebounds ) => [ //rebounds = {off: neki1, def: neki2}
        `0 RENDERER*TREE*$ime*GEOM*TEXT SET ${surname} (${teamAbr})\0` +
        `0 RENDERER*TREE*$points_1*GEOM*TEXT SET Rebounds (Off/Deff): ${rebounds.off + '/' + rebounds.def}\0`
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$podpis_2_out START\0',      
  },
  assistsPodpis : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/Podpis_2\0`,
        `0 RENDERER*STAGE*DIRECTOR*$podpis_2_in START\0`,
    ],
    main : ( surname, teamAbr, assists ) => [ //pts1={scored: , all: }
        `0 RENDERER*TREE*$ime*GEOM*TEXT SET ${surname} (${teamAbr})\0` +
        `0 RENDERER*TREE*$points_1*GEOM*TEXT SET Assists: ${assists}\0`
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$podpis_2_out START\0',      
  },
  clock : {
    in : () => [
      `0 RENDERER*FRONT_LAYER SET_OBJECT SCENE*${project}/PLAYOUT/ura\0`,
      `0 RENDERER*FRONT_LAYER*STAGE*DIRECTOR*$ura_in START\0`,
    ],
    main : (time, teamAbrA, teamAbrB, quarter, scoreA, scoreB, logoA, logoB, timeouts = {A: 0, B: 0}, fouls = {A: 0, B: 0} ) => {
      return [ 
        "0 "+'RENDERER*FRONT_LAYER*TREE*TREE*$LOGO_1*IMAGE SET IMAGE*' + project + '/FLAGS_CLOCK/'+logoA+'\0',
        "0 "+'RENDERER*FRONT_LAYER*TREE*TREE*$LOGO_2*IMAGE SET IMAGE*' + project + '/FLAGS_CLOCK/'+logoB+'\0',

        `0 RENDERER*FRONT_LAYER*TREE*$Clock*GEOM*TEXT SET ${time}\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$ura_ekipa1*GEOM*TEXT SET ${teamAbrA}\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$ura_ekipa2*GEOM*TEXT SET ${teamAbrB}\0`,
        (quarter != 5 ?`0 RENDERER*FRONT_LAYER*TREE*$q*GEOM*TEXT SET Q${quarter}\0` :`0 RENDERER*FRONT_LAYER*TREE*$q*GEOM*TEXT SET OT\0` ),
        `0 RENDERER*FRONT_LAYER*TREE*$q*GEOM*TEXT SET Q${quarter}\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$ura_rezultat_ekipa1*GEOM*TEXT SET ${scoreA}\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$ura_rezultat_ekipa2*GEOM*TEXT SET ${scoreB}\0`,

        `0 RENDERER*FRONT_LAYER*TREE*$t1_1*ACTIVE SET ${ (timeouts.A > 0)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$t1_2*ACTIVE SET ${ (timeouts.A > 1)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$t1_3*ACTIVE SET ${ (timeouts.A > 2)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$t2_1*ACTIVE SET ${ (timeouts.B > 0)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$t2_2*ACTIVE SET ${ (timeouts.B > 1)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$t2_3*ACTIVE SET ${ (timeouts.B > 2)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$L1*ACTIVE SET ${ (fouls.A > 0)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$L2*ACTIVE SET ${ (fouls.A > 1)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$L3*ACTIVE SET ${ (fouls.A > 2)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$L4*ACTIVE SET ${ (fouls.A > 3)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$L5*ACTIVE SET ${ (fouls.A > 4)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$D1*ACTIVE SET ${ (fouls.B > 0)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$D2*ACTIVE SET ${ (fouls.B > 1)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$D3*ACTIVE SET ${ (fouls.B > 2)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$D4*ACTIVE SET ${ (fouls.B > 3)? 'ON': 'OFF' }\0`,
        `0 RENDERER*FRONT_LAYER*TREE*$D5*ACTIVE SET ${ (fouls.B > 4)? 'ON': 'OFF' }\0`,
    ]},

    out : () => ['0 RENDERER*FRONT_LAYER*STAGE*DIRECTOR*$ura_out START\0']
  },
  standings : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/lestvica\0`,
        `0 RENDERER*STAGE*DIRECTOR*$lestvica_in START\0`
    ],
    main : ( data, title ) =>  
    data.map((row, iter) => {
      if (iter > 0) {
        try {
          return  `0 RENDERER*TREE*$naslov_lestvica*GEOM*TEXT SET ${title} \0`+
                  `0 RENDERER*TREE*$m${iter}*GEOM*TEXT SET ${iter}\0`+
                  `0 RENDERER*TREE*$ekipa_lestvica${iter}*GEOM*TEXT SET ${row[0].value}\0`+
                  `0 RENDERER*TREE*$p${iter}*GEOM*TEXT SET ${row[1].value}\0`+
                  `0 RENDERER*TREE*$w${iter}*GEOM*TEXT SET ${row[2].value}\0`+
                  `0 RENDERER*TREE*$l${iter}*GEOM*TEXT SET ${row[3].value}\0`+
                  `0 RENDERER*TREE*$d${iter}*GEOM*TEXT SET ${row[4].value}\0`+
                  `0 RENDERER*TREE*$pike${iter}*GEOM*TEXT SET ${row[5].value}\0`
        } catch {
          return `0 RENDERER*TREE*$naslov_lestvica*GEOM*TEXT SET ${title} \0`
        }
      }}),
    out : () => '0 RENDERER*STAGE*DIRECTOR*$lestvica_out START\0'      
  },
  fixtures : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/pari\0`,
        `0 RENDERER*STAGE*DIRECTOR*$pari_in START\0`,
    ],
    main : ( data ) =>  
      data.map((row, iter) => 
        `0 RENDERER*TREE*$${iter}*GEOM*TEXT SET ${row[0].value}\0`+
        `0 RENDERER*TREE*$par${iter}*GEOM*TEXT SET ${row[1].value}\0`+
        `0 RENDERER*TREE*$Datum_${iter}*GEOM*TEXT SET ${row[2].value}\0`
      )
    ,
    out : () => '0 RENDERER*STAGE*DIRECTOR*$pari_out START\0',      
  },
  quarter_1 : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/RESULT_Q1\0`,
        `0 RENDERER*STAGE*DIRECTOR*$RESULT_Q1_IN START\0`,
    ],
    main : ( teamTitleA, teamTitleB, score, quarterScore ) => [ 
      `0 RENDERER*TREE*$ekipa1*GEOM*TEXT SET ${teamTitleA}\0`,
      `0 RENDERER*TREE*$ekipa2*GEOM*TEXT SET ${teamTitleB}\0`,
      `0 RENDERER*TREE*$rezultat_ekipa1*GEOM*TEXT SET ${score.A}\0`,
      `0 RENDERER*TREE*$rezultat_ekipa2*GEOM*TEXT SET ${score.B}\0`,
      `0 RENDERER*TREE*$1stl*GEOM*TEXT SET ${quarterScore[0].A}\0`,
      `0 RENDERER*TREE*$1std*GEOM*TEXT SET ${quarterScore[0].B}\0`,
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$RESULT_Q1_OUT START\0',      
  },
  quarter_2 : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/RESULT_Q2\0`,
        `0 RENDERER*STAGE*DIRECTOR*$RESULT_Q2_IN START\0`,
    ],
    main : ( teamTitleA, teamTitleB, score, quarterScore ) => [ 
      `0 RENDERER*TREE*$ekipa1*GEOM*TEXT SET ${teamTitleA}\0`,
      `0 RENDERER*TREE*$ekipa2*GEOM*TEXT SET ${teamTitleB}\0`,
      `0 RENDERER*TREE*$rezultat_ekipa1*GEOM*TEXT SET ${score.A}\0`,
      `0 RENDERER*TREE*$rezultat_ekipa2*GEOM*TEXT SET ${score.B}\0`,
      `0 RENDERER*TREE*$1stl*GEOM*TEXT SET ${quarterScore[0].A}\0`,
      `0 RENDERER*TREE*$1std*GEOM*TEXT SET ${quarterScore[0].B}\0`,
      `0 RENDERER*TREE*$2ndl*GEOM*TEXT SET ${quarterScore[1].A}\0`,
      `0 RENDERER*TREE*$2ndd*GEOM*TEXT SET ${quarterScore[1].B}\0`,
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$RESULT_Q2_OUT START\0',      
  },
  quarter_3 : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/RESULT_Q3\0`,
        `0 RENDERER*STAGE*DIRECTOR*$RESULT_Q3_IN START\0`,
    ],
    main : ( teamTitleA, teamTitleB, score, quarterScore ) => [ 
      `0 RENDERER*TREE*$ekipa1*GEOM*TEXT SET ${teamTitleA}\0`,
      `0 RENDERER*TREE*$ekipa2*GEOM*TEXT SET ${teamTitleB}\0`,
      `0 RENDERER*TREE*$rezultat_ekipa1*GEOM*TEXT SET ${score.A}\0`,
      `0 RENDERER*TREE*$rezultat_ekipa2*GEOM*TEXT SET ${score.B}\0`,
      `0 RENDERER*TREE*$1stl*GEOM*TEXT SET ${quarterScore[0].A}\0`,
      `0 RENDERER*TREE*$1std*GEOM*TEXT SET ${quarterScore[0].B}\0`,
      `0 RENDERER*TREE*$2ndl*GEOM*TEXT SET ${quarterScore[1].A}\0`,
      `0 RENDERER*TREE*$2ndd*GEOM*TEXT SET ${quarterScore[1].B}\0`,
      `0 RENDERER*TREE*$3rdl*GEOM*TEXT SET ${quarterScore[2].A}\0`,
      `0 RENDERER*TREE*$3rdd*GEOM*TEXT SET ${quarterScore[2].B}\0`,
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$RESULT_Q3_OUT START\0',      
  },
  quarter_4 : {
    in : () => [
        `0 RENDERER SET_OBJECT SCENE*${project}/PLAYOUT/RESULT_Q4\0`,
        `0 RENDERER*STAGE*DIRECTOR*$RESULT_Q4_IN START\0`,
    ],
    main : ( teamTitleA, teamTitleB, score, quarterScore ) => [ 
      `0 RENDERER*TREE*$ekipa1*GEOM*TEXT SET ${teamTitleA}\0`,
      `0 RENDERER*TREE*$ekipa2*GEOM*TEXT SET ${teamTitleB}\0`,
      `0 RENDERER*TREE*$rezultat_ekipa1*GEOM*TEXT SET ${score.A}\0`,
      `0 RENDERER*TREE*$rezultat_ekipa2*GEOM*TEXT SET ${score.B}\0`,
      `0 RENDERER*TREE*$1stl*GEOM*TEXT SET ${quarterScore[0].A}\0`,
      `0 RENDERER*TREE*$1std*GEOM*TEXT SET ${quarterScore[0].B}\0`,
      `0 RENDERER*TREE*$2ndl*GEOM*TEXT SET ${quarterScore[1].A}\0`,
      `0 RENDERER*TREE*$2ndd*GEOM*TEXT SET ${quarterScore[1].B}\0`,
      `0 RENDERER*TREE*$3rdl*GEOM*TEXT SET ${quarterScore[2].A}\0`,
      `0 RENDERER*TREE*$3rdd*GEOM*TEXT SET ${quarterScore[2].B}\0`,
      `0 RENDERER*TREE*$4thl*GEOM*TEXT SET ${quarterScore[3].A}\0`,
      `0 RENDERER*TREE*$4thd*GEOM*TEXT SET ${quarterScore[3].B}\0`,
    ],
    out : () => '0 RENDERER*STAGE*DIRECTOR*$RESULT_Q4_OUT START\0',      
  },

}



export default tcpStringsList
