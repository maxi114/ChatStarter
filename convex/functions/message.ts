import { v } from "convex/values";
import { query, mutation } from "../_generated/server"; ///query is a function that fetches data and mutation modifies the data

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

export const create = mutation({
  args: {
    sender: v.string(),
    content: v.string(),
  },

  handler: async (ctx, { sender, content }) => {
    await ctx.db.insert("messages", { sender, content });
  },
});
