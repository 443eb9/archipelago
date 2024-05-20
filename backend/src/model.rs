use chrono::{DateTime, Utc};
use serde::Serialize;
use serde_repr::Serialize_repr;
use sqlx::{prelude::Type, FromRow};

#[derive(Debug, Serialize_repr, Type)]
#[repr(u32)]
pub enum IslandType {
    Article,
    Achievement,
}

#[derive(Debug, Serialize, FromRow)]
pub struct TagData {
    pub id: u32,
    pub name: String,
    pub amount: u32,
}

#[derive(Debug, Serialize, FromRow)]
pub struct IslandMeta {
    pub id: u32,
    pub title: String,
    pub subtitle: String,
    pub desc: String,
    pub date: DateTime<Utc>,
    pub ty: IslandType,
    pub banner: bool,
    pub wip: bool,
}

#[derive(Debug, Serialize)]
pub struct IslandMetaTagged {
    pub id: u32,
    pub title: String,
    pub subtitle: String,
    pub desc: String,
    pub date: DateTime<Utc>,
    pub ty: IslandType,
    pub tags: Vec<TagData>,
    pub banner: bool,
    pub wip: bool,
}

impl IslandMetaTagged {
    pub fn new(meta: IslandMeta, tags: Vec<TagData>) -> Self {
        Self {
            id: meta.id,
            title: meta.title,
            subtitle: meta.subtitle,
            desc: meta.desc,
            date: meta.date,
            ty: meta.ty,
            tags,
            banner: meta.banner,
            wip: meta.wip,
        }
    }
}

#[derive(Debug, Serialize, FromRow)]
pub struct IslandFilename(pub String);

#[derive(Debug, Serialize)]
pub struct Island {
    pub content: String,
}

#[derive(Debug, Serialize, FromRow)]
pub struct IslandCount {
    pub count: u32,
}
