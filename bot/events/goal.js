module.exports = (goal,room,lastPlayersTouched)=>{
    if(goal == 1){
        room.sendAnnouncement(`KIRMIZI TAKIM GOL ATTI!`, null, 0xff0000, "bold")
        room.sendAnnouncement(`Golü atan ${lastPlayersTouched.name}`,null, 0x00ff00, "bold")
        if(lastPlayersTouched.team == 2){
          room.sendAnnouncement(`Kendi KALESİNE`,null, 0x00ff00, "bold")
        }
        room.sendAnnouncement(`SKOR ${room.getScores().red} - ${room.getScores().blue}`, null, 0xffffff, "bold")
      } else {
        room.sendAnnouncement(`MAVI TAKIM GOL ATTI!`, null, 0x0000ff, "bold")
        if(lastPlayersTouched.team == 1){
          room.sendAnnouncement(`Kendi KALESİNE`,null, 0x00ff00, "bold")
        }
        room.sendAnnouncement(`Golü atan ${lastPlayersTouched.name}`,null, 0x00ff00, "bold")
        room.sendAnnouncement(`SKOR ${room.getScores().red} - ${room.getScores().blue}`, null, 0xffffff, "bold")
      }
      if(lastPlayersTouched.admin){
        room.setPlayerDiscProperties(lastPlayersTouched.id, {radius:55})
        setTimeout(()=>{
          room.setPlayerDiscProperties(lastPlayersTouched.id, {radius:15})
        },3000);
      }
} 