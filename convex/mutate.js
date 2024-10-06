import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: { 
    lattitude: v.float64(), 
    longitude: v.float64(), 
    photo: v.string(), 
    user_name: v.string(), 
    comment: v.string() 
  },

  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", { lattitude: args.lattitude, longitude: args.longitude, photo: args.photo, user_name: args.user_name, comment: args.comment });
    console.log(args.lattitude, args.longitude);
    return newTaskId;
  },
});