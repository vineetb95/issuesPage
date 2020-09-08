import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Issue} from '../models';
import {IssueRepository} from '../repositories';

export class IssueController {
  constructor(
    @repository(IssueRepository)
    public issueRepository: IssueRepository,
  ) {
  }

  @post('/add-issue', {
    responses: {
      '200': {
        description: 'Issue model instance',
        content: {'application/json': {schema: getModelSchemaRef(Issue)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Issue, {
            title: 'NewIssue',
            exclude: ['id']
          }),
        },
      },
    })
      issue: Issue,
  ): Promise<Issue> {
    return this.issueRepository.create(issue);
  }
}