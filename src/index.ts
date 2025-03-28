import { Context, Schema } from 'koishi'

export const name = 'auto-self-recall'

export const reusable = true

export interface Config {
  time: number
}

export const Config: Schema<Config> = Schema.object({
  time: Schema.number()
    .description("消息发出后过多久撤回（s）")
    .required()
})

export function apply(ctx: Context, config: Config) {
  ctx.on("send", (session) => {
    ctx.setTimeout(async () => {
      await session.bot.deleteMessage(session.channelId, session.messageId)
    }, config.time * 1000)
  })
}
