import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTask = mutation({
  args: { 
    latitude: v.float64(), 
    longitude: v.float64(), 
    photo: v.string(), 
    user_name: v.string(), 
    comment: v.string() 
  },

  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", { latitude: args.latitude, longitude: args.longitude, photo: args.photo, user_name: args.user_name, comment: args.comment });
    console.log(args.latitude, args.longitude);
    return newTaskId;
  },
});