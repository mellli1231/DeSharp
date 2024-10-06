import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "../convex/_generated/server";

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

      // Now that the task is created, get the URL for the uploaded photo
    const photoURL = await ctx.storage.getUrl(args.storageId);

    // Update the task with the photoURL
    await ctx.db.patch(newTaskId, { photoURL });

    return newTaskId;
  },
});

export const deleteTask = mutation({
  args: {
    _id: v.id("tasks"),
    photo: v.id("_storage"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args._id);
    await ctx.storage.delete(args.photo);
  }
});

