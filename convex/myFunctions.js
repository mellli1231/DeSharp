import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createTask = mutation({
  args: { 
    latitude: v.number(), 
    longitude: v.number(), 
    storageId: v.id("_storage"), 
    user_name: v.string(), 
    comment: v.string() 
  },

  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert(
      "tasks", { 
        latitude: args.latitude, 
        longitude: args.longitude, 
        photo: args.storageId, 
        user_name: args.user_name, 
        comment: args.comment 
      });
    console.log(args.latitude, args.longitude);
    return newTaskId;
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks")
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
});