export class Inlinecmd extends plugin {
  constructor () {
    super({
      name: '侦测inlinecmd',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(.*)mqqapi:\/\/aio\/inlinecmd\?command=(.*)/,
          fnc: 'catchInlineCmd'
        },
      ]
    })
  }
  async catchInlineCmd(e){
    if(e.isPrivate){
        return false
    }
    //填写启用群聊和禁用群聊，如果都不填则所有群均启用
    const enabledGroup = []
    //启用群聊为空时禁用群聊才生效
    const disabledGroup = []
    //排除掉Bot发送的inlinecmd
    const BotUser = ["123456789","987654321"]
    if(enabledGroup.length > 0){
        if(!enabledGroup.includes(e.group_id)){
            return false
        }
    }else if(disabledGroup.length > 0){
        if(disabledGroup.includes(e.group_id)){
            return false
        }
    }
    if(BotUser.length > 0 && BotUser.includes(e.user_id)){
        return false
    }
    const regex = /(?<=command=)(.*)(?=&reply)/;
    const command = e.msg.match(regex);
    e.reply(`检测到inlinecmd！command: ${command[0]}，请注意甄别`)
  }
}