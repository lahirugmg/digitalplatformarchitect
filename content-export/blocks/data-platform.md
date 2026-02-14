---
title: Data Platform
slug: data-platform
type: building-block
keywords: delta lake, ETL/ELT, BI, ML pipelines, catalog
---

# Data Platform

## Summary
Lakehouse, BI/analytics, and ML pipelines with governance, quality, and lineage.

## What it is

An enterprise data platform that ingests, stores, models, and serves analytical and operational data — enabling BI and ML with strong governance and observability.

## Related patterns

- Data Mesh (decentralized ownership, federated governance)
- Pipes and Filters (pipelines composition)
- Event-Driven Architecture (streaming ingestion)

## Responsibilities

- Batch and streaming ingestion (CDC, connectors)
- Curated storage (lakehouse/warehouse) and modeling
- Metadata, catalog, lineage, and governance
- Pipelines orchestration and quality monitoring
- Serving: BI, ML features, and APIs

## Core capabilities

- Medallion/layered data architecture
- Transformations (dbt/Spark/Flink) and orchestration
- Lineage, data contracts, and quality checks
- Feature store and reproducible ML pipelines

## Architecture patterns

- Lambda/Kappa processing
- Data mesh with domain ownership
- CDC into lakes and warehouses
- Materialized views and serving layers

## Tech examples

- Databricks/Delta Lake
- Snowflake
- BigQuery
- Apache Hudi/Iceberg
- dbt
- Airflow/Prefect

## KPIs/SLIs

- Data freshness and completeness
- Pipeline success rate and duration
- Quality rule violations
- Lineage coverage


