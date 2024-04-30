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
pub struct Tag {
    pub id: u32,
    pub name: String,
    pub amount: u32,
}

#[derive(Debug, Serialize, FromRow)]
pub struct IslandMeta {
    pub id: u32,
    pub title: String,
    pub desc: String,
    pub date: DateTime<Utc>,
    pub ty: IslandType,
}

#[derive(Debug, Serialize, FromRow)]
pub struct IslandFilename(pub String);

#[derive(Debug, Serialize)]
pub struct Island {
    pub content: String,
}