-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "text" VARCHAR NOT NULL,
    "photo_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "photos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;