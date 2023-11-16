﻿// <auto-generated />
using System;
using BeautyQueenApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BeautyQueenApi.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("BeautyQueenApi.Models.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<TimeOnly>("EndAt")
                        .HasColumnType("time without time zone");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("PromotionId")
                        .HasColumnType("integer");

                    b.Property<int>("ScheduleId")
                        .HasColumnType("integer");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.Property<TimeOnly>("StartAt")
                        .HasColumnType("time without time zone");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("PromotionId");

                    b.HasIndex("ScheduleId");

                    b.HasIndex("ServiceId");

                    b.ToTable("Appointment");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("ImageId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("SpecializationId")
                        .HasColumnType("integer");

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ImageId")
                        .IsUnique();

                    b.HasIndex("SpecializationId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Image");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Meta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Meta");

                    b.HasData(
                        new
                        {
                            Id = 1
                        });
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("FileId")
                        .HasColumnType("integer");

                    b.Property<int>("ServiceId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("FileId")
                        .IsUnique();

                    b.HasIndex("ServiceId");

                    b.ToTable("Photo");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Promotion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Discount")
                        .HasColumnType("integer");

                    b.Property<int>("ImageId")
                        .HasColumnType("integer");

                    b.Property<DateOnly?>("PeriodFrom")
                        .HasColumnType("date");

                    b.Property<DateOnly?>("PeriodTo")
                        .HasColumnType("date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UnitId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ImageId")
                        .IsUnique();

                    b.HasIndex("UnitId");

                    b.ToTable("Promo");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Role");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Админ"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Мастер"
                        });
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Schedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<TimeOnly>("EndAt")
                        .HasColumnType("time without time zone");

                    b.Property<TimeOnly>("StartAt")
                        .HasColumnType("time without time zone");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Schedule");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Duration")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Price")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("Service");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Settings", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<TimeOnly>("DefaultEndWorkTime")
                        .HasColumnType("time without time zone");

                    b.Property<TimeOnly>("DefaultStartWorkTime")
                        .HasColumnType("time without time zone");

                    b.Property<int?>("FaviconId")
                        .HasColumnType("integer");

                    b.Property<string>("Mail")
                        .HasColumnType("text");

                    b.Property<string>("MainDescription")
                        .HasColumnType("text");

                    b.Property<int?>("MainPhotoId")
                        .HasColumnType("integer");

                    b.Property<string>("MainTitle")
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.Property<string>("Vk")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("FaviconId")
                        .IsUnique();

                    b.HasIndex("MainPhotoId")
                        .IsUnique();

                    b.ToTable("Settings");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DefaultEndWorkTime = new TimeOnly(18, 0, 0),
                            DefaultStartWorkTime = new TimeOnly(10, 0, 0)
                        });
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Specialization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Specialization");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Unit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Unit");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "р"
                        },
                        new
                        {
                            Id = 2,
                            Name = "%"
                        });
                });

            modelBuilder.Entity("BeautyQueenApi.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("ExpiresIn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("text");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Login")
                        .IsUnique();

                    b.HasIndex("RoleId");

                    b.ToTable("User");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Login = "login1",
                            Password = "$2a$11$.D3yIlhEXmM3tm5JTkXE8OW9z1qcUslGqqRjAEDCw6G2PbyoUVsTC",
                            RoleId = 1
                        });
                });

            modelBuilder.Entity("EmployeeService", b =>
                {
                    b.Property<int>("EmployeesId")
                        .HasColumnType("integer");

                    b.Property<int>("ServicesId")
                        .HasColumnType("integer");

                    b.HasKey("EmployeesId", "ServicesId");

                    b.HasIndex("ServicesId");

                    b.ToTable("EmployeeService");
                });

            modelBuilder.Entity("PromotionService", b =>
                {
                    b.Property<int>("PromotionsId")
                        .HasColumnType("integer");

                    b.Property<int>("ServicesId")
                        .HasColumnType("integer");

                    b.HasKey("PromotionsId", "ServicesId");

                    b.HasIndex("ServicesId");

                    b.ToTable("PromotionService");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Appointment", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeautyQueenApi.Models.Promotion", "Promotion")
                        .WithMany()
                        .HasForeignKey("PromotionId");

                    b.HasOne("BeautyQueenApi.Models.Schedule", "Schedule")
                        .WithMany()
                        .HasForeignKey("ScheduleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeautyQueenApi.Models.Service", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("Promotion");

                    b.Navigation("Schedule");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Employee", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Image", "Image")
                        .WithOne("Employee")
                        .HasForeignKey("BeautyQueenApi.Models.Employee", "ImageId");

                    b.HasOne("BeautyQueenApi.Models.Specialization", "Specialization")
                        .WithMany()
                        .HasForeignKey("SpecializationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeautyQueenApi.Models.User", "User")
                        .WithOne("Employee")
                        .HasForeignKey("BeautyQueenApi.Models.Employee", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");

                    b.Navigation("Specialization");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Image", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Photo", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Image", "File")
                        .WithOne("Photo")
                        .HasForeignKey("BeautyQueenApi.Models.Photo", "FileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeautyQueenApi.Models.Service", "Service")
                        .WithMany()
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("File");

                    b.Navigation("Service");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Promotion", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Image", "Image")
                        .WithOne("Promo")
                        .HasForeignKey("BeautyQueenApi.Models.Promotion", "ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeautyQueenApi.Models.Unit", "Unit")
                        .WithMany()
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");

                    b.Navigation("Unit");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Schedule", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Settings", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Image", "Favicon")
                        .WithOne("Favicon")
                        .HasForeignKey("BeautyQueenApi.Models.Settings", "FaviconId");

                    b.HasOne("BeautyQueenApi.Models.Image", "MainPhoto")
                        .WithOne("MainPhoto")
                        .HasForeignKey("BeautyQueenApi.Models.Settings", "MainPhotoId");

                    b.Navigation("Favicon");

                    b.Navigation("MainPhoto");
                });

            modelBuilder.Entity("BeautyQueenApi.Models.User", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("EmployeeService", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Employee", null)
                        .WithMany()
                        .HasForeignKey("EmployeesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeautyQueenApi.Models.Service", null)
                        .WithMany()
                        .HasForeignKey("ServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PromotionService", b =>
                {
                    b.HasOne("BeautyQueenApi.Models.Promotion", null)
                        .WithMany()
                        .HasForeignKey("PromotionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeautyQueenApi.Models.Service", null)
                        .WithMany()
                        .HasForeignKey("ServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BeautyQueenApi.Models.Image", b =>
                {
                    b.Navigation("Employee")
                        .IsRequired();

                    b.Navigation("Favicon")
                        .IsRequired();

                    b.Navigation("MainPhoto")
                        .IsRequired();

                    b.Navigation("Photo")
                        .IsRequired();

                    b.Navigation("Promo")
                        .IsRequired();
                });

            modelBuilder.Entity("BeautyQueenApi.Models.User", b =>
                {
                    b.Navigation("Employee")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
