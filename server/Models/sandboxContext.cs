using System;
using System.Collections.Generic;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Sandbox.Models
{
    public partial class sandboxContext : DbContext
    {
        public sandboxContext()
        {
        }

        public sandboxContext(DbContextOptions<sandboxContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bill> Bills { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Orderchat> Orderchats { get; set; } = null!;
        public virtual DbSet<Ordermessage> Ordermessages { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseNpgsql("Host=localhost;Database=sandbox;Username=admin;Password=ZKEVL2P4x89fwe5r");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bill>(entity =>
            {
                entity.ToTable("bills");

                entity.Property(e => e.BillId).HasColumnName("bill_id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.CompletedAt).HasColumnName("completed_at");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Status)
                    .HasMaxLength(12)
                    .HasColumnName("status")
                    .HasDefaultValueSql("'WAITING'::character varying");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("bills_user_id_fkey");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.ExecutorId).HasColumnName("executor_id");

                entity.Property(e => e.ExpiredAt).HasColumnName("expired_at");

                entity.Property(e => e.Money).HasColumnName("money");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.OrderCustomers)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("orders_customer_id_fkey");

                entity.HasOne(d => d.Executor)
                    .WithMany(p => p.OrderExecutors)
                    .HasForeignKey(d => d.ExecutorId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("orders_executor_id_fkey");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("orders_product_id_fkey");
            });

            modelBuilder.Entity<Orderchat>(entity =>
            {
                entity.ToTable("orderchats");

                entity.Property(e => e.OrderchatId).HasColumnName("orderchat_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Orderchats)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("orderchats_order_id_fkey");
            });

            modelBuilder.Entity<Ordermessage>(entity =>
            {
                entity.ToTable("ordermessages");

                entity.Property(e => e.OrdermessageId).HasColumnName("ordermessage_id");

                entity.Property(e => e.Attachments)
                    .HasColumnType("character varying(256)[]")
                    .HasColumnName("attachments")
                    .HasDefaultValueSql("ARRAY[]::character varying[]");

                entity.Property(e => e.CreatedAt)
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Message)
                    .HasMaxLength(6000)
                    .HasColumnName("message");

                entity.Property(e => e.OrderchatId).HasColumnName("orderchat_id");

                entity.Property(e => e.OwnerId).HasColumnName("owner_id");

                entity.Property(e => e.ReadedUserIds)
                    .HasColumnName("readed_user_ids")
                    .HasDefaultValueSql("ARRAY[]::bigint[]");

                entity.Property(e => e.ReplyMessageId).HasColumnName("reply_message_id");

                entity.HasOne(d => d.Orderchat)
                    .WithMany(p => p.Ordermessages)
                    .HasForeignKey(d => d.OrderchatId)
                    .HasConstraintName("ordermessages_orderchat_id_fkey");

                entity.HasOne(d => d.Owner)
                    .WithMany(p => p.Ordermessages)
                    .HasForeignKey(d => d.OwnerId)
                    .HasConstraintName("ordermessages_owner_id_fkey");

                entity.HasOne(d => d.ReplyMessage)
                    .WithMany(p => p.InverseReplyMessage)
                    .HasForeignKey(d => d.ReplyMessageId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("ordermessages_reply_message_id_fkey");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Cost).HasColumnName("cost");

                entity.Property(e => e.CostBy)
                    .HasMaxLength(16)
                    .HasColumnName("cost_by");

                entity.Property(e => e.CostEnd).HasColumnName("cost_end");

                entity.Property(e => e.CostStart).HasColumnName("cost_start");

                entity.Property(e => e.Description)
                    .HasColumnType("character varying")
                    .HasColumnName("description");

                entity.Property(e => e.Image)
                    .HasMaxLength(128)
                    .HasColumnName("image");

                entity.Property(e => e.Name)
                    .HasColumnType("character varying")
                    .HasColumnName("name");

                entity.Property(e => e.Type).HasColumnName("type");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.DiscordId)
                    .HasName("user_pkey");

                entity.ToTable("users");

                entity.Property(e => e.DiscordId)
                    .ValueGeneratedNever()
                    .HasColumnName("discord_id");

                entity.Property(e => e.FrozenMoney).HasColumnName("frozen_money");

                entity.Property(e => e.Money).HasColumnName("money");

                entity.Property(e => e.Rating)
                    .HasColumnName("rating")
                    .HasDefaultValueSql("100");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
