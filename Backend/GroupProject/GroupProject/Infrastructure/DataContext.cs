using GroupProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace GroupProject.Infrastructure
{
    public class DataContext : DbContext
    {
        public DataContext() : base("RoomMe")
        {

        }

        public IDbSet<User> Users { get; set; }
        public IDbSet<Room> Rooms { get; set; }
        public IDbSet<Message> Messages { get; set; }
        public IDbSet<Conversation> Conversations { get; set; }
        public IDbSet<Favorite> Favorites { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)

        //configure relationships
        {

            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            //Compound Key
            modelBuilder.Entity<Favorite>()
                .HasKey(a => new { a.UserId, a.RoomId });

            //A User has many Favorites
            modelBuilder.Entity<User>()
                .HasMany(r => r.Favorites)
                .WithRequired(f => f.User)
                .HasForeignKey(f => f.UserId);

            ////A Room has many Favorites
            //modelBuilder.Entity<Room>()
            //    .HasMany(r => r.Favorites)
            //    .WithRequired(f => f.Room)
            //    .HasForeignKey(f => f.RoomId);


            //One to Many User to Rooms
            modelBuilder.Entity<User>()
                .HasMany(u => u.Rooms)
                .WithRequired(r => r.User)
                .HasForeignKey(r => r.UserId);


            ////One to Many User to Conversation(SendId)
            //modelBuilder.Entity<User>()
            //    .HasMany(c => c.Conversations)
            //    .WithRequired(u => u.Sender)
            //    .HasForeignKey(u => u.Sender_UserId);

            //One to Many User to Converstaion(ReceiveId)
            //modelBuilder.Entity<User>()
            //   .HasMany(c => c.Conversations)
            //   .WithRequired(u => u.Receiver)
            //   .HasForeignKey(u => u.Receiver_UserId);

            modelBuilder.Entity<Conversation>()
                .HasRequired(c => c.Sender)
                .WithMany(s => s.Conversations)
                .HasForeignKey(s => s.SenderUserId);

            modelBuilder.Entity<Conversation>()
               .HasRequired(c => c.Receiver)
               .WithMany()
               .HasForeignKey(s => s.ReceiverUserId);

            //modelBuilder.Entity<Conversation>()
            //   .HasRequired(m => m.Sender)
            //   .WithMany(m => m.Conversations)
            //   .HasForeignKey(m => m.Sender_UserId);

            //modelBuilder.Entity<Conversation>()
            //    .HasRequired(m => m.Receiver)
            //    .WithMany()
            //    .HasForeignKey(m => m.Receiver_UserId);

            //One to Many Conversation to Messages
            modelBuilder.Entity<Conversation>()
                .HasMany(c => c.Messages)
                .WithRequired(m => m.Conversation)
                .HasForeignKey(m => m.ConversationId);

            base.OnModelCreating(modelBuilder);
        }
    }
}