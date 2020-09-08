import {
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Issue} from '../models';
import {IssueRepository} from '../repositories';

export class IssueController {
  constructor(
    @repository(IssueRepository)
    public issueRepository : IssueRepository,
  ) {}

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
            exclude:['id']
          }),
        },
      },
    })
    issue: Issue,
  ): Promise<Issue> {
    return this.issueRepository.create(issue);
  }

  @get('/list-issues', {
    responses: {
      '200': {
        description: 'Array of Issue model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Issue, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.number('page') pageNo=1,
    @param.query.number('id') id :number,
  ): Promise<Issue[]> {
    return this.issueRepository.find({
      offset: ((pageNo-1)*10),
      limit: 10,
      where:{id},
    });
  }

  @patch('/update-issue/{id}', {
    responses: {
      '204': {
        description: 'Issue PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Issue, {partial: true}),
        },
      },
    })
    issue: Omit<Issue,'id'>,
  ): Promise<void> {
    await this.issueRepository.updateById(id, issue);
  }

  @del('/delete-issue/{id}', {
    responses: {
      '204': {
        description: 'Issue DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.issueRepository.deleteById(id);
  }

}
